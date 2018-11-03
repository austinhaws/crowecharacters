<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class AccountXDollDao extends BaseDao
{

	public function knownFields()
	{
		return [
			'id',
			'account_id',
			'doll_id',
		];
	}

	public function selectDollsByAccountId($accountId)
	{
		return DB::table('doll')
			->join('account_x_doll', 'account_x_doll.doll_id', '=', 'doll.id')
			->where('account_x_doll.account_id', '=', $accountId)
			->orderBy('doll.name')
			->get()->all();
	}

	public function connectDollToAccount(int $dollId, int $accountId)
	{
		$accountXDoll = DB::table('account_x_doll')
			->where('doll_id', '=', $dollId)
			->first();

		if (!$accountXDoll) {
			DB::table('account_x_doll')
				->insert([
					'account_id' => $accountId,
					'doll_id' => $dollId,
				]);
		}
	}
}
