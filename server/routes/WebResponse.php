<?php

require_once('dao/RolesDao.php');

function webResponse($data, $accountGuid) {
	return response()->json([
		'errors' => null,
		'roles' => rolesDao()->selectByAccountGuid($accountGuid),
		'data' => $data,
	], 200, [], JSON_UNESCAPED_UNICODE);
}
