<?php

namespace App\Http\Services;

use App\Http\Daos\ImageDao;
use Illuminate\Http\Request;

class ImageService {

	private $webResponse;
	private $imageDao;

	public function __construct(WebResponse $webResponse, ImageDao $imageDao)
	{
		$this->webResponse = $webResponse;
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
			'originalName' => $file->getClientOriginalName(),
			'width' => $width,
			'height' => $height,
			'name' => null,
		];

		// create new record and gets its id
		$this->imageDao->save($imageData);



		$imageData['disk_name'] = $this->fileName($imageData, $file);
		$file->move(env(CONFIG_IMAGES_FOLDER) . "/", $imageData['name']);

		$this->imageDao->save($imageData);

		return $this->webResponse->response($imageData);
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
