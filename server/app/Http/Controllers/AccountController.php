<?php

namespace App\Http\Controllers;

use App\Http\Daos\AccountDao;
use App\Http\Services\AccountService;
use App\Http\Services\WebResponse;
use Laravel\Lumen\Routing\Controller as BaseController;

class AccountController extends BaseController
{
	private $accountDao;
	private $accountService;
	private $webResponse;

	public function __construct(
		AccountDao $accountDao,
		AccountService $accountService,
		WebResponse $webResponse
	)
	{
		$this->accountDao = $accountDao;
		$this->accountService = $accountService;
		$this->webResponse = $webResponse;
	}

	public function getAccount() {
		$account = $this->accountDao->selectByGuid($this->accountService->accountGuidFromHeader());
		if (!$account) {
			$account = $this->accountDao->insert($this->accountService->randomAccountPhrase());
		}
		return $this->webResponse->response($account);
    }
}
