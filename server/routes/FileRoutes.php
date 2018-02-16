<?php

use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;

require_once __DIR__ . '/../constants.php';

// name of the file on disc
define('FIELD_FILE_NAME', 'name');
// body, image
define('FIELD_FILE_FILE_TYPE', 'fileType');
// what the file was called when it was posted
define('FIELD_FILE_ORIGINAL_NAME', 'originalName');

$router->group(['prefix' => 'file'], function () use ($router) {
	// upload a new body image
	$router->post('upload', function (Request $request) {
		return uploadFile($request);
	});

	// get a file
	$router->get('get/{guid}', function ($guid) {
		return getFile($guid);
	});

	// all files
	$router->get('all', function () {
		return getAllFiles();
	});
});


/**
 * get all the files in the db
 *
 * @return \Illuminate\Http\JsonResponse all the files json
 */
function getAllFiles() {
	$files = DB::table('files')->get();
	foreach ($files as $file) {
		unset($file->id);
	}
	return response()->json($files);
}

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

	$fileData = [
		'version' => 1,
		FIELD_FILE_FILE_TYPE => $request->input(FIELD_FILE_FILE_TYPE),
		'originalName' => $file->getClientOriginalName(),
	];


	// create new record and gets its id
	$id = DB::table('files')->insertGetId([FIELD_GUID => $guid]);

	$fileData[FIELD_FILE_NAME] = "$id.{$file->getClientOriginalExtension()}";

	$file->move(env('IMAGES_FOLDER') . "/{$fileData[FIELD_FILE_FILE_TYPE]}/", $fileData[FIELD_FILE_NAME]);

	DB::table('files')->where('id', $id)->update(['file' => json_encode($fileData)]);

	return getFile($guid);
}

/**
 * @param $guid string
 * @return \Illuminate\Http\JsonResponse
 */
function getFile($guid) {
	$record = DB::table('files')->where(FIELD_GUID, $guid)->first();
	unset($record->id);
	return response()->json($record);
}
