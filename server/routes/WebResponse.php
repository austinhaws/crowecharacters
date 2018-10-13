<?php

require_once('dao/RolesDao.php');
require_once('service/CleanRecordService.php');

function webResponse($data) {
	$accountGuid = app('request')->header('Authorization');
	return response()->json([
		'errors' => null,
		'roles' => $accountGuid ? array_map(function ($role) {return $role->role;}, rolesDao()->selectByAccountGuid($accountGuid)->all()) : [],
		'data' => cleanRecordService()->cleanRecord($data),
	], 200, [], JSON_UNESCAPED_UNICODE);
}
