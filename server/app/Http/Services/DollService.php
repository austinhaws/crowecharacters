<?php

namespace App\Http\Services;

use App\Http\Daos\DollDao;
use App\Http\Daos\ImageSetDao;
use App\Http\Daos\ImageSetXImageDao;

class DollService
{

	private $webResponseService;
	private $imageSetDao;
	private $imageSetXImageDao;
	private $cleanRecordService;
	private $dollDao;

	public function __construct(
		ImageSetXImageDao $imageSetXImageDao,
		WebResponseService $webResponseService,
		ImageSetDao $imageSetDao,
		CleanRecordService $cleanRecordService,
		DollDao $dollDao
	) {
		$this->imageSetXImageDao = $imageSetXImageDao;
		$this->webResponseService = $webResponseService;
		$this->imageSetDao = $imageSetDao;
		$this->cleanRecordService = $cleanRecordService;
		$this->dollDao = $dollDao;
	}

	public function getDoll(string $guid)
	{
		$doll = $this->dollDao->selectDollByGuid($guid);
		return $this->webResponseService->response($doll);
	}

	public function saveDoll(array $doll)
	{
		return $this->webResponseService->response($this->dollDao->save($doll));
	}
}
