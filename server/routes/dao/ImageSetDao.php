<?php

class ImageSetDao {

	public function selectAll()
	{
		return DB::table('image_set')->get()->all();
	}

	public function selectByGuid(string $guid)
	{
		return DB::table('image_set')->where('guid', '=' , $guid)->first()->all();
	}

	public function save($imageSet) {
		if (isset($imageSet['guid'])) {
			DB::table('image_set')
				->where('guid', '=', $imageSet['guid'])
				->update($imageSet);
		} else {
			$imageSet['guid'] = uniqid();
			$imageSet['id'] = DB::table('image_set')->insertGetId($imageSet);
		}
		return $imageSet;
	}
}

function imageSetDao() {
	return new ImageSetDao();
}
