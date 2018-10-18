<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class ImageDao {

	public function save(&$image) {
		if (isset($image['guid'])) {
			DB::table('image')
				->where('guid', '=', $image['guid'])
				->update($image);
		} else {
			$image['guid'] = uniqid();
			$image['id'] = DB::table('image_set')->insertGetId($image);
		}
		return $image;
	}
}
