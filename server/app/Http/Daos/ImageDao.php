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
			'pretty_name',
		];
	}

	public function save(&$image)
	{
		if (isset($image['guid'])) {
			DB::table('image')
				->where('guid', '=', $image['guid'])
				->update($this->cleanDaoRecord($image));
		} else {
			$image['guid'] = uniqid();
			$image['id'] = DB::table('image')->insertGetId($this->cleanDaoRecord($image));
		}
		return $image;
	}

	public function selectByGuid($guid)
	{
		return DB::table('image')
			->where('guid', '=', $guid)
			->first();
	}

	public function deleteById($id)
	{
		return DB::table('image')
			->where('id', '=', $id)
			->delete();
	}
}
