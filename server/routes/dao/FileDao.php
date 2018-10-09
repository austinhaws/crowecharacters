<?php

class FileDao {

	public function insertFile($fileGuid)
	{
		return DB::table('files')->insertGetId([FIELD_GUID => $fileGuid]);
	}

	public function updateFile($fileId, $fileData)
	{
		DB::table(TABLE_FILES)->where('id', $fileId)->update(['data' => json_encode($fileData)]);
	}
}

function fileDao() {
	return new FileDao();
}
