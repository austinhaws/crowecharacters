<?php

require_once __DIR__ . '/../constants.php';

$router->group(['prefix' => 'account'], function () use ($router) {
	// get account information
	$router->get('get/{guid}', function ($guid) {
		return getAccount($guid);
	});

	// get a new account
	$router->get('new', function () {
		return newAccount();
	});
});

/**
 * get account from its guid (strip pk)
 *
 * @param $guid String the guid of the account
 * @return String json of the account matching hte guid
 */
function getAccount(String $guid)
{
	$account = DB::table('accounts')->where('guid', $guid)->first();
	unset($account->id);
	return response()->json($account);
}


/**
 * create a new account and return it
 *
 * @return string the new account guid
 */
function newAccount()
{
	// create a new guid
	$guid = uniqid();

	DB::table('accounts')->insert([
		'guid' => $guid,
	]);

	// call get account ot return the account naturally
	return getAccount($guid);
}