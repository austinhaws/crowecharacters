<?php

namespace App\Http\Controllers;

use App\Http\Services\DataListService;
use Laravel\Lumen\Routing\Controller as BaseController;

class DataListController extends BaseController
{
	private $dataListService;

	public function __construct(DataListService $dataListService)
	{
		$this->dataListService = $dataListService;
	}

	public function imageCategories()
	{
		return $this->dataListService->imageCategories();
	}
}
