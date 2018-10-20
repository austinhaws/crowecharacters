<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class ImageSetDao extends BaseDao
{
	public function knownFields()
	{
		return [
			'id',
			'guid',
			'name',
			'z_index',
		];
	}

	public function selectAll()
	{
		return DB::table('image_set')->get()->all();
	}

	public function selectByGuid(string $guid)
	{
		return DB::table('image_set')->where('guid', '=', $guid)->first();
	}

	public function selectImagesByImageSetId($imageSetId)
	{
		return DB::table('image')
			->join('image_set_x_image', 'image_set_x_image.image_id', '=', 'image.id')
			->where('image_set_x_image.image_set_id', '=', $imageSetId)
			->get()
			->all();
	}

	public function save($imageSet)
	{
		$cleanData = $this->cleanDaoRecord($imageSet);

		if (isset($imageSet['guid'])) {
			DB::table('image_set')
				->where('guid', '=', $imageSet['guid'])
				->update($cleanData);
		} else {
			$imageSet['guid'] = uniqid();
			$cleanData['guid'] = $imageSet['guid'];
			$imageSet['id'] = DB::table('image_set')->insertGetId($cleanData);
		}
		return $imageSet;
	}

	public function delete(string $guid)
	{
		$imageSet = $this->selectByGuid($guid);
		DB::table('image_set_x_image')
			->where('image_set_id', '=', $imageSet->id)
			->delete();

		DB::table('image_set')
			->where('id', '=', $imageSet->id)
			->delete();
	}
}
