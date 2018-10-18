<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class ImageSetImageDao {

	public function selectImagesByImageSetId(string $imageSetId)
	{
		return DB::table('image')
			->select('image.*')
			->join('image_set_x_image', 'image_set_x_image.image_id', '=', 'image.id')
			->where('image_set_x_image.image_set_id', '=', $imageSetId)
			->get()->all();
	}
}
