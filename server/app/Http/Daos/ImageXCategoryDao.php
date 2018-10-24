<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class ImageXCategoryDao extends BaseDao
{

	public function knownFields()
	{
		return [
			'id',
			'image_category_id',
			'image_id',
		];
	}

	public function deleteByImageId($id)
	{
		DB::table('image_x_image_category')
			->where('image_id', '=', $id)
			->delete();
	}

	public function insertImageConnection($imageId, $categoryId)
	{
		DB::table('image_x_image_category')
			->insert([
				'image_id' => $imageId,
				'image_category_id' => $categoryId,
			]);
	}
}
