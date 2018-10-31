<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class DollDao extends BaseDao
{

	public function knownFields()
	{
		return [
			'id',
			'guid',
		];
	}

	public function selectByGuid($guid)
	{
		return DB::table('doll')
			->where('guid', '=', $guid)
			->first();
	}

	public function save($doll)
	{
		$cleanData = $this->cleanDaoRecord($doll);

		if (isset($doll['guid'])) {
			DB::table('doll')
				->where('guid', '=', $doll['guid'])
				->update($cleanData);
		} else {
			$doll['guid'] = uniqid();
			$cleanData['guid'] = $doll['guid'];
			$doll['id'] = DB::table('doll')->insertGetId($cleanData);
		}
		return $doll;
	}

}
