<?php

class ImageSetDao {

	public function selectAll()
	{
		return DB::table('image_set')->get()->all();
	}

	public function selectByGuid(string $guid)
	{
		return DB::table('image_set')->where('guid', '=' , $guid)->first();
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

function imageSetDao() {
	return new ImageSetDao();
}
