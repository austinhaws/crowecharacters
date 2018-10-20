<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class ImageDao extends BaseDao
{

	public function knownFields()
	{
		return [
			'id',
			'guid',
			'width',
			'height',
			'original_name',
			'disk_name',
		];
	}

	public function save(&$image)
	{
		if (isset($image['guid'])) {
			DB::table('image')
				->where('guid', '=', $image['guid'])
				->update($image);
		} else {
			$image['guid'] = uniqid();
			$image['id'] = DB::table('image')->insertGetId($image);
		}
		return $image;
	}

	public function selectByGuid($guid)
	{
		return DB::table('image')
			->where('guid', '=', $guid)
			->first();
	}
}
