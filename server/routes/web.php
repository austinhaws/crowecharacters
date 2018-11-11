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

	$router->get('doll/get/{guid}', 'DollController@getDoll');
	$router->post('doll/save/{accountGuid}', 'DollController@saveDoll');
	$router->get('doll/all/{accountGuid}', 'DollController@all');
	$router->get('doll/addImage/{dollGuid}/{imageGuid}', 'DollController@addImage');
	$router->get('doll/removeImage/{dollGuid}/{imageGuid}', 'DollController@removeImage');

	$router->get('imageset/all', 'ImageSetController@all');
	$router->get('imageset/delete/{guid}', 'ImageSetController@delete');
	$router->get('imageset/get/{guid}', 'ImageSetController@get');
	$router->post('imageset/save', 'ImageSetController@save');

	$router->post('image/upload', 'ImageController@upload');
	$router->post('image/save', 'ImageController@save');
	$router->get('image/delete/{guid}', 'ImageController@delete');
	$router->get('image/connectImageSet/{imageGuid}/{imageSetGuid}/{zIndex}', 'ImageController@connectToImageSet');
	$router->get('image/connectCategory/{imageGuid}/{categoryGuid}', 'ImageController@connectToCategory');

	$router->post('imageSetXImage/save', 'ImageSetXImageController@save');

	$router->get('dataList/imageCategories', 'DataListController@imageCategories');
});

$router->get('/', function () use ($router) {
	return $router->app->version();
});
