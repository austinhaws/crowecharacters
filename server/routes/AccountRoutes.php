<?php

require_once('WebResponse.php');

$router->group(['prefix' => 'account'], function () use ($router) {

	/**
	 * randomly select a word for a passphrase by type
	 *
	 * @param $type string [adjective|noun]
	 * @return string
	 */
	function selectRandomWord($type) {
		$query = DB::table('account_words');
		$query->select('word');
		$query->orderByRaw('RAND()');
		$query->limit(1);
		$query->where('type', '=', $type);

		$records = $query->get();
		return $records[0]->word;
	}

	/**
	 * create a new account with a new passphrase
	 *
	 * @return object the new account
	 */
	function newAccount() {
		do {
			$adjective = selectRandomWord('adjective');
			$noun = selectRandomWord('noun');
			$number = mt_rand(10, 99);

			$phrase = "$adjective$noun$number";

			$account = DB::table('accounts')->where('phrase', '=', $phrase)->get();
		} while (count($account));

		$guid = uniqid();
		DB::table('accounts')->insert(['guid' => $guid, 'phrase' => $phrase]);

		return DB::table('accounts')->where(FIELD_GUID, $guid)->first();
	}

	$router->get('new', function () {
		$account = newAccount();
		return webResponse(cleanRecord($account));
	});

	$router->get('get/{phrase}', function ($phrase) {
		$account = DB::table('accounts')->where('phrase', '=' , $phrase)->first();
		if (!$account) {
			$account = newAccount();
		}
		return webResponse(cleanRecord($account));
	});
});
