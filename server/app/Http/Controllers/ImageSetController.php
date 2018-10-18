<?php

namespace App\Http\Controllers;

use App\Http\Daos\ImageSetDao;
use App\Http\Services\WebResponse;
use Laravel\Lumen\Routing\Controller as BaseController;

class ImageSetController extends BaseController
{
	private $webResponse;
	private $imageSetDao;

	public function __construct(
		WebResponse $webResponse,
		ImageSetDao $imageSetDao)
	{
		$this->webResponse = $webResponse;
		$this->imageSetDao = $imageSetDao;
	}

	public function all()
	{
		return $this->webResponse->response($this->imageSetDao->selectAll());
	}

	public function get(string $guid)
	{
		$imageSet = $this->imageSetDao->selectByGuid($guid);
		$imageSet->images = $this->imageSetDao->selectImagesByImageSetId($imageSet->id);
		return $this->webResponse->response($imageSet);
	}

	public function delete(string $guid)
	{
		$this->imageSetDao->delete($guid);
		return $this->webResponse->response(null);
	}

	public function save(\Illuminate\Http\Request $request)
	{
		return $this->webResponse->response($this->imageSetDao->save($request->json()->all()));
	}
}
