<?php

namespace App\Http\Services;

use App\Http\Daos\ImageSetDao;

class ImageSetService
{

	private $webResponseService;
	private $imageSetDao;

	public function __construct(WebResponseService $webResponseService, ImageSetDao $imageSetDao)
	{
		$this->webResponseService = $webResponseService;
		$this->imageSetDao = $imageSetDao;
	}

	public function all()
	{
		return $this->webResponseService->response($this->imageSetDao->selectAll());
	}

	public function get(string $guid)
	{
		$imageSet = $this->imageSetDao->selectByGuid($guid);
		$imageSet->images = $this->imageSetDao->selectImagesByImageSetId($imageSet->id);
		return $this->webResponseService->response($imageSet);
	}

	public function delete(string $guid)
	{
		$this->imageSetDao->delete($guid);
		return $this->webResponseService->response($guid);
	}

	public function save(array $imageSet)
	{
		return $this->webResponseService->response($this->imageSetDao->save($imageSet));
	}
}
