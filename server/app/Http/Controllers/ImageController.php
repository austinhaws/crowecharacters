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

	public function connectToImageSet(string $imageGuid, string $imageSetGuid, int $zIndex)
	{
		return $this->imageService->connectImageToImageSet($imageGuid, $imageSetGuid, $zIndex);
	}

	public function connectToCategory(string $imageGuid, string $categoryGuid)
	{
		return $this->imageService->connectImageToCategory($imageGuid, $categoryGuid);
	}

	public function save(Request $request)
	{
		return $this->imageService->save($request->json()->all());
	}

	public function delete($imageGuid)
	{
		return $this->imageService->delete($imageGuid);
	}
}
