<?php

namespace App\Http\Controllers;

use App\Http\Services\ImageService;
use Illuminate\Http\Request;
use Laravel\Lumen\Routing\Controller as BaseController;

class ImageController extends BaseController
{
	private $imageService;

	public function __construct(
		ImageService $imageService)
	{
		$this->imageService = $imageService;
	}

	public function upload(Request $request)
	{
		return $this->imageService->uploadImage($request);
	}

	public function connect(string $imageGuid, string $imageSetGuid)
	{
		return $this->imageService->connectImageToImageSet($imageGuid, $imageSetGuid);
	}
}