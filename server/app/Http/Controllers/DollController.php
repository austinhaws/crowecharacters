<?php

namespace App\Http\Controllers;

use App\Http\Daos\AccountDao;
use App\Http\Services\DollService;
use Laravel\Lumen\Routing\Controller as BaseController;

class DollController extends BaseController
{
	private $dollService;
	private $accountDao;

	public function __construct(
		DollService $dollService,
		AccountDao $accountDao
	) {
		$this->dollService = $dollService;
		$this->accountDao = $accountDao;
	}

	public function getDoll(string $guid)
	{
		return $this->dollService->getDoll($guid);
	}

	public function saveDoll(string $accountGuid, \Illuminate\Http\Request $request)
	{
		return $this->dollService->saveDoll($accountGuid, $request->json()->all());
	}

	public function all(string $accountGuid)
	{
		return $this->dollService->allForAccountGuid($accountGuid);
	}

	public function addImage(string $dollGuid, string $imageGuid)
	{
		return $this->dollService->addImage($dollGuid, $imageGuid);
	}
}
