<?php

namespace App\Http\Services;

use App\Http\Daos\AccountDao;
use App\Http\Daos\AccountXDollDao;
use App\Http\Daos\DollDao;
use App\Http\Daos\DollXImageDao;
use App\Http\Daos\ImageDao;
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
	private $dollXImageDao;
	private $imageDao;

	public function __construct(
		ImageSetXImageDao $imageSetXImageDao,
		WebResponseService $webResponseService,
		ImageSetDao $imageSetDao,
		CleanRecordService $cleanRecordService,
		DollDao $dollDao,
		AccountDao $accountDao,
		AccountXDollDao $accountXDollDao,
		DollXImageDao $dollXImageDao,
		ImageDao $imageDao
	) {
		$this->imageSetXImageDao = $imageSetXImageDao;
		$this->webResponseService = $webResponseService;
		$this->imageSetDao = $imageSetDao;
		$this->cleanRecordService = $cleanRecordService;
		$this->dollDao = $dollDao;
		$this->accountDao = $accountDao;
		$this->accountXDollDao = $accountXDollDao;
		$this->dollXImageDao = $dollXImageDao;
		$this->imageDao = $imageDao;
	}

	public function getDoll(string $guid)
	{
		$doll = $this->dollDao->selectDollByGuid($guid);
		$doll->imageGuids = $this->dollXImageDao->selectImageGuidsForDoll($doll->id);
		return $this->webResponseService->response($doll);
	}

	public function saveDoll(string $accountGuid, array $doll)
	{
		// save doll to get id
		$imageSet = $this->imageSetDao->selectByGuid($doll['image_set_guid']);
		$doll['image_set_id'] = $imageSet ? $imageSet->id : null;
		$resultDoll = $this->dollDao->saveDoll($doll);

		// tie to account: select doll to get ID - updating through saveDoll doesn't get Id
		$doll = $this->dollDao->selectDollByGuid($resultDoll['guid']);
		$account = $this->accountDao->selectByGuid($accountGuid);
		$this->accountXDollDao->connectDollToAccount($doll->id, $account->id);

		return $this->webResponseService->response($doll);
	}

	public function allForAccountGuid(string $accountGuid)
	{
		$account = $this->accountDao->selectByGuid($accountGuid);
		return $this->webResponseService->response($this->accountXDollDao->selectDollsByAccountId($account->id));
	}

	public function addImage(string $dollGuid, string $imageGuid)
	{
		$doll = $this->dollDao->selectDollByGuid($dollGuid);
		$image = $this->imageDao->selectByGuid($imageGuid);
		$this->dollXImageDao->connectImageToDoll($image->id, $doll->id);

		return $this->webResponseService->response("success");
	}

	public function removeImage(string $dollGuid, string $imageGuid)
	{
		$doll = $this->dollDao->selectDollByGuid($dollGuid);
		$image = $this->imageDao->selectByGuid($imageGuid);
		$this->dollXImageDao->removeImageFromDoll($image->id, $doll->id);

		return $this->webResponseService->response("success");
	}
}
