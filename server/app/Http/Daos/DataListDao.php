<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class DataListDao extends BaseDao
{

	public function knownFields()
	{
		return [];
	}

	public function imageCategories()
	{
		return DB::table('image_category')
			->orderBy('display_order')
			->get()
			->all();
	}
}
