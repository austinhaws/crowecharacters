<?php

class AccountService {
	public function randomAccountPhrase() {
		do {
			$adjective = wordDao()->selectRandomWord('adjective');
			$noun = wordDao()->selectRandomWord('noun');
			$number = mt_rand(10, 99);

			$phrase = "$adjective$noun$number";

			$guidAccounts = accountDao()->selectByPhrase($phrase);
		} while ($guidAccounts);

		return $phrase;
	}

	public function accountGuidFromHeader() {
		return app('request')->header('Authorization');
	}
}

function accountService() {
	return new AccountService();
}
