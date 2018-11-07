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
		return DB::table('doll_x_image')
			->select('image.guid')
			->join('image', 'image.id', '=', 'doll_x_image.image_id')
			->where('doll_x_image.doll_id', '=', $dollId)
			->get()->all();
	}

//	public function connectDollToAccount(int $dollId, int $accountId)
//	{
//		$accountXDoll = DB::table('account_x_doll')
//			->where('doll_id', '=', $dollId)
//			->first();
//
//		if (!$accountXDoll) {
//			DB::table('account_x_doll')
//				->insert([
//					'account_id' => $accountId,
//					'doll_id' => $dollId,
//				]);
//		}
//	}
}
