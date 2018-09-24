<?php

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;

require_once('WebResponse.php');

// name of the file on disc
define('FIELD_FILE_NAME', 'name');
// body, image
define('FIELD_FILE_FILE_TYPE', 'fileType');
// what the file was called when it was posted
define('FIELD_FILE_ORIGINAL_NAME', 'originalName');

define('TABLE_FILES', 'files');

$router->group(['prefix' => 'file'], function () use ($router) {
	// upload a new body image
	$router->post('upload', function (Request $request) {
		return uploadFile($request);
	});
});

/**
 * create a new account and return it
 *
 * @param Request $request
 * @return \Illuminate\Http\JsonResponse
 */
function uploadFile(Request $request)
{
	// create a new guid
	$guid = uniqid();

	/** @var UploadedFile $file */
	$file = $request->file('file');
	list($width, $height) = getimagesize($file->getPathname());

	$fileData = [
		'version' => 1,
		FIELD_FILE_FILE_TYPE => $request->input(FIELD_FILE_FILE_TYPE),
		'originalName' => $file->getClientOriginalName(),
		'width' => $width,
		'height' => $height,
	];



	// create new record and gets its id
	$id = DB::table(TABLE_FILES)->insertGetId([FIELD_GUID => $guid]);

	$fileData[FIELD_FILE_NAME] = "$id.{$file->getClientOriginalExtension()}";

	$file->move(env(CONFIG_IMAGES_FOLDER) . "/{$fileData[FIELD_FILE_FILE_TYPE]}/", $fileData[FIELD_FILE_NAME]);


	DB::table(TABLE_FILES)->where('id', $id)->update(['data' => json_encode($fileData)]);

	return webResponse($guid);
}
