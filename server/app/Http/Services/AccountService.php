<?php

namespace App\Http\Services;

use App\Http\Daos\AccountDao;
use App\Http\Daos\WordDao;

class AccountService {
	private $wordDao;
	private $accountDao;
	private $webResponseService;

	public function __construct(WordDao $wordDao, AccountDao $accountDao, WebResponseService $webResponseService)
	{
		$this->wordDao = $wordDao;
		$this->accountDao = $accountDao;
		$this->webResponseService = $webResponseService;
	}

	public function getFromHeader() {
		$account = $this->accountDao->selectByGuid($this->accountGuidFromHeader());
		if (!$account) {
			$account = $this->accountDao->insert($this->randomAccountPhrase());
		}
		return $this->webResponseService->response($account);
	}

	private function randomAccountPhrase() {
		do {
			$adjective = $this->wordDao->selectRandomWord('adjective');
			$noun = $this->wordDao->selectRandomWord('noun');
			$number = mt_rand(10, 99);

			$phrase = "$adjective$noun$number";

			$guidAccounts = $this->accountDao->selectByPhrase($phrase);
		} while ($guidAccounts);

		return $phrase;
	}

	private function accountGuidFromHeader() {
		return app('request')->header('Authorization');
	}
}
