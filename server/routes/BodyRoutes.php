<?php

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;

require_once __DIR__ . '/../constants.php';

$router->group(['prefix' => 'body'], function () use ($router) {
	// upload a new body image
	$router->post('upload', function (Request $request) {
		newBody($request);
	});

	// get a body
	$router->get('get/{guid}', function ($guid) {
		return getBody($guid);
	});
});

/**
 * create a new account and return it
 *
 * @param Request $request
 * @return \Illuminate\Http\JsonResponse
 */
function newBody(Request $request)
{
	// create a new guid
	$guid = uniqid();

	/** @var UploadedFile $file */
	$file = $request->file('image');

	// create new body record and gets its id
	$id = DB::table('bodies')->insertGetId([FIELD_GUID => $guid, 'filename' => $file->getFilename(), ]);


	$file->move(config('IMAGES_FOLDER') . 'bodies/', $id . $file->getClientOriginalExtension());
	return getBody($guid);
}

/**
 * @param $guid string
 * @return \Illuminate\Http\JsonResponse
 */
function getBody($guid) {
	$body = DB::table('bodies')->where(FIELD_GUID, $guid)->first();
	unset($body->id);
	return response()->json($body);
}
