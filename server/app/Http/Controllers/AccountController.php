<?php

namespace App\Http\Controllers;

use App\Http\Services\AccountService;
use Laravel\Lumen\Routing\Controller as BaseController;

class AccountController extends BaseController
{
	private $accountService;

	public function __construct(AccountService $accountService)
	{
		$this->accountService = $accountService;
	}

	public function getAccount() {
		return $this->accountService->getFromHeader();
    }
}
