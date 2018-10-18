<?php

namespace App\Http\Services;

use App\Http\Daos\AccountDao;
use App\Http\Daos\WordDao;

class AccountService {
	private $wordDao;
	private $accountDao;

	public function __construct(WordDao $wordDao, AccountDao $accountDao)
	{
		$this->wordDao = $wordDao;
		$this->accountDao = $accountDao;
	}

	public function randomAccountPhrase() {
		do {
			$adjective = $this->wordDao->selectRandomWord('adjective');
			$noun = $this->wordDao->selectRandomWord('noun');
			$number = mt_rand(10, 99);

			$phrase = "$adjective$noun$number";

			$guidAccounts = $this->accountDao->selectByPhrase($phrase);
		} while ($guidAccounts);

		return $phrase;
	}

	public function accountGuidFromHeader() {
		return app('request')->header('Authorization');
	}
}
