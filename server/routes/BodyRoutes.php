<?php

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;

$router->group(['prefix' => 'body'], function () use ($router) {
	// upload a new body image
	$router->post('upload', function (Request $request) {
		newBody($request);
	});
});

/**
 * create a new account and return it
 *
 * @return string the new account guid
 */
function newBody(Request $request)
{
	// create a new guid
	$guid = uniqid();

	/** @var UploadedFile $file */
	$file = $request->file('image');

	// create new body record and gets its id
	$id = DB::table('bodies')->insertGetId(['guid' => $guid, 'filename' => $file->getFilename(), ]);


	$file->move(config('IMAGES_FOLDER') . 'bodies/', $id . $file->getClientOriginalExtension());
	return geBody($guid);
}
