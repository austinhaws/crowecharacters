<?php

use Illuminate\Http\Request;

require_once __DIR__ . '/../constants.php';

$router->group(['prefix' => 'body'], function () use ($router) {
	// upload a new body image
	$router->post('new', function () {
		return newBody();
	});

	// get a body
	$router->get('all', function () {
		return getAllBodies();
	});

	// save body
	$router->post('save/{guid}', function ($guid, Request $request) {
		return saveBody($guid, $request);
	});
});

/**
 * @return \Illuminate\Http\JsonResponse
 */
function getAllBodies() {
	$records = DB::table('bodies')->get();
	foreach ($records as $record) {
		unset($record->id);
	}
	return response()->json($records);
}

/**
 * @param string $guid the guid for the body
 * @param Request $request data sent in
 * @return \Illuminate\Http\JsonResponse
 */
function saveBody($guid, Request $request) {
	DB::table('bodies')->where('guid', $guid)->update(['body' => $request->input('body')]);
	return messageSuccess();
}

/**
 * create a new account and return it
 *
 * @return \Illuminate\Http\JsonResponse
 */
function newBody()
{
	// create a new guid
	$guid = uniqid();

	// create new body record and gets its id
	DB::table('bodies')->insert([FIELD_GUID => $guid]);

	// return the new body
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
