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

namespace App;

$router->group([], function ($router) {
	$router->get('account/get', 'AccountController@getAccount');

	$router->get('imageset/all', 'ImageSetController@all');
	$router->get('imageset/delete/{guid}', 'ImageSetController@delete');
	$router->get('imageset/get/{guid}', 'ImageSetController@get');
	$router->post('imageset/save', 'ImageSetController@save');

	$router->post('upload', 'ImageController@uplaod');
});

$router->get('/', function () use ($router) {
	return $router->app->version();
});
