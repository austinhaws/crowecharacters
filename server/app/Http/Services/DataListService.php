<?php

namespace App\Http\Services;

use App\Http\Daos\DataListDao;

class DataListService
{
	private $webResponseService;
	private $dataListDao;

	public function __construct(DataListdao $dataListDao, WebResponseService $webResponseService)
	{
		$this->webResponseService = $webResponseService;
		$this->dataListDao = $dataListDao;
	}

	public function imageCategories()
	{
		return $this->webResponseService->response($this->dataListDao->imageCategories());
	}
}
