<?php

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
});
