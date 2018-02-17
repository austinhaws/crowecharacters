<?php

// data field passed for a lot of things
define('FIELD_GUID', 'guid');


function messageSuccess() {
	return response()->json(['result' => 'success']);
}