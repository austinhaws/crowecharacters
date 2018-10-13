<?php

class FileDao {

//	public function insertFile($fileGuid)
//	{
//		return DB::table('file')->insertGetId([FIELD_GUID => $fileGuid]);
//	}
//
//	public function updateFile($fileId, $fileData)
//	{
//		DB::table('file')->where('id', $fileId)->update(['data' => json_encode($fileData)]);
//	}
}

function fileDao() {
	return new FileDao();
}
