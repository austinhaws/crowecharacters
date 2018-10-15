<?php

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

function imageSetImageDao() {
	return new ImageSetImageDao();
}
