<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class DollXImageDao extends BaseDao
{

	public function knownFields()
	{
		return [
			'id',
			'image_id',
			'doll_id',
		];
	}

	public function selectImageGuidsForDoll($dollId)
	{
		return array_map(
			function ($guidMap) {
				return $guidMap->guid;
			},
			DB::table('doll_x_image')
				->select('image.guid')
				->join('image', 'image.id', '=', 'doll_x_image.image_id')
				->where('doll_x_image.doll_id', '=', $dollId)
				->get()->all()
		);
	}

	public function connectImageToDoll(int $imageId, int $dollId)
	{
		$imageXDoll = DB::table('doll_x_image')
			->where('image_id', '=', $imageId)
			->first();

		if (!$imageXDoll) {
			DB::table('doll_x_image')
				->insert([
					'doll_id' => $dollId,
					'image_id' => $imageId,
				]);
		}
	}
}
