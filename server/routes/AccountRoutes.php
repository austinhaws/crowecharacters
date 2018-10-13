<?php

require_once('WebResponse.php');
require_once('dao/AccountDao.php');
require_once('dao/WordDao.php');
require_once('service/AccountService.php');


$router->group(['prefix' => 'account'], function () use ($router) {

	$router->get('get', function () {
		$account = accountDao()->selectByGuid(accountService()->accountGuidFromHeader());
		if (!$account) {
			$account = accountDao()->insert(accountService()->randomAccountPhrase());
		}
		return webResponse($account);
	});
});
