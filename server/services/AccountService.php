<?php

class AccountService {
	/**
	 * @param $guid String the guid of the account
	 * @return null or the account if it exists
	 */
	static function getAccount(String $guid) {
		$account = DB::table('accounts')->where('guid', $guid)->first();
		unset($account->id);
		return response()->json($account);
	}


	static function newAccount() {
		$guid = uniqid();
		DB::table('accounts')->insert([
			'guid' => $guid,
		]);
		return self::getAccount($guid);
	}
}
