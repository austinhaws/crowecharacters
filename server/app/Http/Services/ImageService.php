<?php

namespace App\Http\Services;

use App\Http\Daos\ImageDao;
use App\Http\Daos\ImageSetDao;
use App\Http\Daos\ImageSetXImageDao;
use Illuminate\Http\Request;

class ImageService
{

	private $webResponseService;
	private $imageDao;
	private $imageSetDao;
	private $imageSetXImageDao;

	public function __construct(
		WebResponseService $webResponseService,
		ImageDao $imageDao,
		ImageSetDao $imageSetDao,
		ImageSetXImageDao $imageSetXImageDao
	)
	{
		$this->webResponseService = $webResponseService;
		$this->imageDao = $imageDao;
		$this->imageSetDao = $imageSetDao;
		$this->imageSetXImageDao = $imageSetXImageDao;
	}

	/**
	 *
	 * @param Request $request
	 * @return \Illuminate\Http\JsonResponse
	 */
	public function uploadImage(Request $request)
	{
		$file = $request->file('file');
		list($width, $height) = getimagesize($file->getPathname());

		$imageData = [
			'original_name' => $file->getClientOriginalName(),
			'pretty_name' => explode('.', $file->getClientOriginalName())[0],
			'width' => $width,
			'height' => $height,
			'disk_name' => 'pre-load',
		];

		// create new record and gets its id
		$this->imageDao->save($imageData);


		$imageData['disk_name'] = $this->fileName($imageData, $file);
		$file->move(env('IMAGES_FOLDER'), $imageData['disk_name']);

		$this->imageDao->save($imageData);

		return $this->webResponseService->response($imageData);
	}

	/**
	 * @param $imageData array data (id specifically) of the file in the db
	 * @param $file \Illuminate\Http\UploadedFile the file to upload
	 * @return string name on the disk for the file
	 */
	private function fileName($imageData, $file)
	{
		return "{$imageData['id']}.{$file->getClientOriginalExtension()}";
	}

	public function connectImageToImageSet(string $imageGuid, string $imageSetGuid)
	{
		$image = $this->imageDao->selectByGuid($imageGuid);
		$imageSet = $this->imageSetDao->selectByGuid($imageSetGuid);
		$this->imageSetXImageDao->connectImageToImageSet($image->id, $imageSet->id);
		return $this->webResponseService->response([$image, $imageSet]);
	}

	public function save($image)
	{
		return $this->webResponseService->response($this->imageDao->save($image));
	}

	public function delete($imageGuid)
	{
		$image = $this->imageDao->selectByGuid($imageGuid);
		$this->imageSetXImageDao->deleteByImageId($image->id);
		$this->imageDao->deleteById($image->id);
		return $this->webResponseService->response($image);
	}
}
