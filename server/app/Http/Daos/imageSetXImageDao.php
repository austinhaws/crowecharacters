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
			'z_index',
		];
	}

	public function selectImagesByImageSetId(string $imageSetId)
	{
		return DB::table('image')
			->select(['image.*', 'image_set_x_image.z_index', 'image_category.guid AS image_category_guid'])
			->join('image_set_x_image', 'image_set_x_image.image_id', '=', 'image.id')
			->join('image_x_image_category', 'image_x_image_category.image_id', '=', 'image.id', 'left')
			->join('image_category', 'image_x_image_category.image_category_id', '=', 'image_category.id', 'left')
			->where('image_set_x_image.image_set_id', '=', $imageSetId)
			->orderBy('image_set_x_image.z_index')
			->get()->all();
	}


	public function connectImageToImageSet(int $imageId, int $imageSetId, int $zIndex)
	{
		DB::table('image_set_x_image')
			->insert([
				'image_id' => $imageId,
				'image_set_id' => $imageSetId,
				'z_index' => $zIndex,
			]);
	}

	public function deleteByImageId($id)
	{
		DB::table('image_set_x_image')
			->where('image_id', '=', $id)
			->delete();
	}

	public function saveImageId_ZIndex($imageId, $zIndex)
	{
		DB::table('image_set_x_image')
			->where('image_id', '=', $imageId)
			->update(['z_index' => $zIndex]);
	}
}
