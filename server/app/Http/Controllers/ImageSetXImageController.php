<?php

namespace App\Http\Controllers;

use App\Http\Services\ImageSetXImageService;
use Laravel\Lumen\Routing\Controller as BaseController;

class ImageSetXImageController extends BaseController
{
	private $imageSetXImageService;

	public function __construct(
		ImageSetXImageService $imageSetXImageService)
	{
		$this->imageSetXImageService = $imageSetXImageService;
	}

	public function save(\Illuminate\Http\Request $request)
	{
		$data = $request->json()->all();
		return $this->imageSetXImageService->saveImageGuid_ZIndex($data['imageGuid'], $data['zIndex']);
	}
}
