<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class ImageSetXImageDao extends BaseDao
{

	public function knownFields()
	{
		return [
			'id',
			'image_set_id',
			'image_id',
		];
	}

	public function selectImagesByImageSetId(string $imageSetId)
	{
		return DB::table('image')
			->select('image.*')
			->join('image_set_x_image', 'image_set_x_image.image_id', '=', 'image.id')
			->where('image_set_x_image.image_set_id', '=', $imageSetId)
			->get()->all();
	}


	public function connectImageToImageSet(int $imageId, int $imageSetId)
	{
		DB::table('image_set_x_image')
			->insert([
				'image_id' => $imageId,
				'image_set_id' => $imageSetId,
			]);
	}

}
