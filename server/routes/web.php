<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

require __DIR__ . "/../services/AccountService.php";

$router->group(['prefix' => 'account'], function () use ($router) {
	$router->get('get/{guid}', function ($guid) {
		return AccountService::getAccount($guid);
	});

	$router->get('new', function() {
		return AccountService::newAccount();
	});
});



$router->get('/', function () use ($router) {
    return $router->app->version();
});
