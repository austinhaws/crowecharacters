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
			'image_set_id',
			'name',
			'print_name',
			'print_cut_border',
			'print_percent',
		];
	}

	public function selectDollByGuid($guid)
	{
		return DB::table('doll')
			->select(['doll.*', 'image_set.guid AS image_set_guid'])
			->join('image_set', 'image_set.id', '=', 'doll.image_set_id', 'left')
			->where('doll.guid', '=', $guid)
			->first();
	}

	public function saveDoll($doll)
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
			$cleanData['id'] = $doll['id'];
		}

		return $cleanData;
	}

	public function deleteDollById($dollId)
	{
		DB::table('doll')
			->where('id', '=', $dollId)
			->delete();
	}
}
