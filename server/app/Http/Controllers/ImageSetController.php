<?php

namespace App\Http\Controllers;

use App\Http\Services\ImageSetService;
use Laravel\Lumen\Routing\Controller as BaseController;

class ImageSetController extends BaseController
{
	private $imageSetService;

	public function __construct(
		ImageSetService $imageSetService)
	{
		$this->imageSetService = $imageSetService;
	}

	public function all()
	{
		return $this->imageSetService->all();
	}

	public function get(string $guid)
	{
		return $this->imageSetService->get($guid);
	}

	public function delete(string $guid)
	{
		return $this->imageSetService->delete($guid);
	}

	public function save(\Illuminate\Http\Request $request)
	{
		return $this->imageSetService->save($request->json()->all());
	}
}
