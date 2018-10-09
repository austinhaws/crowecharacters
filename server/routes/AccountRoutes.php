<?php

use Illuminate\Http\Request;

require_once('WebResponse.php');
require_once('dao/AccountDao.php');

$router->group(['prefix' => 'account'], function () use ($router) {

	$router->get('new', function () {
		$account = accountDao()->insert();
		return webResponse(cleanRecord($account), $account->guid);
	});

	$router->get('get/{phrase}', function ($phrase) {
		$account = accountDao()->selectByPhrase($phrase);
		if (!$account) {
			$account = accountDao()->insert();
		}
		return webResponse(cleanRecord($account), $account->guid);
	});

	$router->post('save/{guid}', function ($guid, Request $request) {
		accountDao()->update($guid, $request->input('data'));
		return webResponse(['result' => 'success'], $guid);
	});
});
