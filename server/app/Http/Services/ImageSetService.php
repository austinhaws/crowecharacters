<?php

namespace App\Http\Services;

use App\Http\Daos\ImageSetDao;

class ImageSetService
{

	private $webResponseService;
	private $imageSetDao;
	private $cleanRecordService;

	public function __construct(WebResponseService $webResponseService, ImageSetDao $imageSetDao, CleanRecordService $cleanRecordService)
	{
		$this->webResponseService = $webResponseService;
		$this->imageSetDao = $imageSetDao;
		$this->cleanRecordService = $cleanRecordService;
	}

	public function all()
	{
		return $this->webResponseService->response($this->imageSetDao->selectAll());
	}

	public function get(string $guid)
	{
		$imageSet = $this->imageSetDao->selectByGuid($guid);
		$images = $this->imageSetDao->selectImagesByImageSetId($imageSet->id);
		$imageSet->images = $this->cleanRecordService->cleanRecord($images);
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
