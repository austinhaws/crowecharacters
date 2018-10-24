<?php

namespace App\Http\Services;

use App\Http\Daos\DataListDao;
use App\Http\Daos\ImageDao;
use App\Http\Daos\ImageSetDao;
use App\Http\Daos\ImageSetXImageDao;
use App\Http\Daos\ImageXCategoryDao;
use Illuminate\Http\Request;

class ImageService
{

	private $imageSetService;
	private $webResponseService;
	private $imageDao;
	private $imageSetDao;
	private $imageSetXImageDao;
	private $imageXCategoryDao;
	private $dataListDao;

	public function __construct(
		ImageSetService $imageSetService,
		WebResponseService $webResponseService,
		ImageDao $imageDao,
		ImageSetDao $imageSetDao,
		ImageSetXImageDao $imageSetXImageDao,
		ImageXCategoryDao $imageXCategoryDao,
		DataListDao $dataListDao
	)
	{
		$this->webResponseService = $webResponseService;
		$this->imageDao = $imageDao;
		$this->imageSetDao = $imageSetDao;
		$this->imageSetXImageDao = $imageSetXImageDao;
		$this->imageSetService = $imageSetService;
		$this->imageXCategoryDao = $imageXCategoryDao;
		$this->dataListDao = $dataListDao;
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

	public function connectImageToImageSet(string $imageGuid, string $imageSetGuid, int $zIndex)
	{
		$image = $this->imageDao->selectByGuid($imageGuid);
		$imageSet = $this->imageSetDao->selectByGuid($imageSetGuid);
		$this->imageSetXImageDao->connectImageToImageSet($image->id, $imageSet->id, $zIndex);

		$image = $this->imageDao->selectByGuid($imageGuid);
		$imageSet = $this->imageSetService->get($imageSetGuid);

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

	public function connectImageToCategory(string $imageGuid, string $categoryGuid)
	{
		$image = $this->imageDao->selectByGuid($imageGuid);

		$this->imageXCategoryDao->deleteByImageId($image->id);

		$categories = $this->dataListDao->imageCategories();
		$category = array_values(array_filter($categories, function ($category) use($categoryGuid) { return $category->guid === $categoryGuid; }))[0];

		$this->imageXCategoryDao->insertImageConnection($image->id, $category->id);

		return $this->webResponseService->response($image);
	}
}
