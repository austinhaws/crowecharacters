<?php

namespace App\Http\Services;

use App\Http\Daos\ImageDao;
use Illuminate\Http\Request;

class ImageService
{

	private $webResponseService;
	private $imageDao;

	public function __construct(WebResponseService $webResponseService, ImageDao $imageDao)
	{
		$this->webResponseService = $webResponseService;
		$this->imageDao = $imageDao;
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
}
