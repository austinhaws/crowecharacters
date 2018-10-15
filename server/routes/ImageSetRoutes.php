<?php

require_once('WebResponse.php');
require_once('dao/ImageSetDao.php');
require_once('dao/ImageSetImageDao.php');


$router->group(['prefix' => 'imageset'], function () use ($router) {

	$router->get('all', function () {
		return webResponse(imageSetDao()->selectAll());
	});

	$router->get('delete/{guid}', function ($guid) {
		return webResponse(imageSetDao()->delete($guid));
	});

	$router->get('get/{guid}', function ($guid) {
		$imageSet = imageSetDao()->selectByGuid($guid);
		$imageSet->images = imageSetImageDao()->selectImagesByImageSetId($imageSet->id);
		return webResponse($imageSet);
	});

	$router->post('save', function (\Illuminate\Http\Request $request) {
		return webResponse(imageSetDao()->save($request->json()->all()));
	});
});
