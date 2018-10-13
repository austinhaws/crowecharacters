<?php

require_once('WebResponse.php');
require_once('dao/ImageSetDao.php');


$router->group(['prefix' => 'imageset'], function () use ($router) {

	$router->get('all', function () {
		return webResponse(imageSetDao()->selectAll());
	});

	$router->get('get/{guid}', function ($guid) {
		$imageSet = imageSetDao()->selectByGuid($guid);
//TODO:		$imageSet['images'] = imageSetImageDao()->selectImagesByImageSetId($imageSet['id']);
		return webResponse($imageSet);
	});

	$router->post('save', function (\Illuminate\Http\Request $request) {
		return webResponse(imageSetDao()->save($request->json()->all()));
	});
});
