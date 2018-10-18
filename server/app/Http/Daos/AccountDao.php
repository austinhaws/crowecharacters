<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class AccountDao {

	public function selectByGuid(string $guid)
	{
		return DB::table('account')->where('guid', '=' , $guid)->first();
	}

	public function selectById(int $id)
	{
		return DB::table('account')->where('id', '=' , $id)->first();
	}

	/**
	 * @param $phrase string phrase unique for this account
	 * @return object account record
	 */
	public function insert($phrase)
	{
		return $this->selectById(DB::table('account')->insertGetId([
			'guid' => uniqid(),
			'phrase' => $phrase,
		]));
	}

	public function selectByPhrase($phrase)
	{
		return DB::table('account')->where('phrase', '=' , $phrase)->first();
	}

	public function update($guid, $data)
	{
		return DB::table('account')->where('guid', '=', $guid)->update(['data' => $data]);
	}
}
