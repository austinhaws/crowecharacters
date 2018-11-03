<?php

namespace App\Http\Services;

use App\Http\Daos\AccountDao;
use App\Http\Daos\AccountXDollDao;
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
	private $accountDao;
	private $accountXDollDao;

	public function __construct(
		ImageSetXImageDao $imageSetXImageDao,
		WebResponseService $webResponseService,
		ImageSetDao $imageSetDao,
		CleanRecordService $cleanRecordService,
		DollDao $dollDao,
		AccountDao $accountDao,
		AccountXDollDao $accountXDollDao
	) {
		$this->imageSetXImageDao = $imageSetXImageDao;
		$this->webResponseService = $webResponseService;
		$this->imageSetDao = $imageSetDao;
		$this->cleanRecordService = $cleanRecordService;
		$this->dollDao = $dollDao;
		$this->accountDao = $accountDao;
		$this->accountXDollDao = $accountXDollDao;
	}

	public function getDoll(string $guid)
	{
		$doll = $this->dollDao->selectDollByGuid($guid);
		return $this->webResponseService->response($doll);
	}

	public function saveDoll(string $accountGuid, array $doll)
	{
		// save doll to get id
		$imageSet = $this->imageSetDao->selectByGuid($doll['image_set_guid']);
		$doll['image_set_id'] = $imageSet ? $imageSet->id : null;
		$resultDoll = $this->dollDao->saveDoll($doll);

		// tie to account
		$account = $this->accountDao->selectByGuid($accountGuid);
		$doll = $this->dollDao->selectDollByGuid($doll['guid'] ? $doll['guid'] : $resultDoll['guid']);
		$this->accountXDollDao->connectDollToAccount($doll->id, $account->id);

		return $this->webResponseService->response($doll);
	}

	public function allForAccountGuid(string $accountGuid)
	{
		$account = $this->accountDao->selectByGuid($accountGuid);
		return $this->webResponseService->response($this->accountXDollDao->selectDollsByAccountId($account->id));
	}
}
