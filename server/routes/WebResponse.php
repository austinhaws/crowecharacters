<?php

require_once('dao/RolesDao.php');

function webResponse($data, $accountGuid) {
	return response()->json([
		'errors' => null,
		'roles' => $accountGuid ? array_map(function ($role) {return $role->role;}, rolesDao()->selectByAccountGuid($accountGuid)->all()) : [],
		'data' => $data,
	], 200, [], JSON_UNESCAPED_UNICODE);
}
