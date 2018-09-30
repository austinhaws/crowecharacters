<?php

function webResponse($data) {
	return response()->json([
		'errors' => null,
		'roles' => [],
		'data' => $data,
	], 200, [], JSON_UNESCAPED_UNICODE);
}
