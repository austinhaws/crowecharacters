<?php

function webResponse($data) {
	return response()->json([
		'errors' => null,
		'roles' => [],
		'data' => $data,
	]);
}
