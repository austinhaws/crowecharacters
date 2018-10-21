<?php

namespace App\Http\Services;

use App\Http\Daos\ImageDao;
use App\Http\Daos\ImageSetXImageDao;

class ImageSetXImageService
{
	private $webResponseService;
	private $imageSetXImageDao;
	private $imageDao;

	public function __construct(
		WebResponseService $webResponseService,
		ImageDao $imageDao,
		ImageSetXImageDao $imageSetXImageDao
	)
	{
		$this->webResponseService = $webResponseService;
		$this->imageSetXImageDao = $imageSetXImageDao;
		$this->imageDao = $imageDao;
	}

	public function saveImageGuid_ZIndex($imageGuid, $zIndex)
	{
		$image = $this->imageDao->selectByGuid($imageGuid);
		$this->imageSetXImageDao->saveImageId_ZIndex($image->id, $zIndex);
		return $this->webResponseService->response($image);
	}
}
