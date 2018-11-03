<?php

namespace App\Http\Controllers;

use App\Http\Services\DollService;
use Laravel\Lumen\Routing\Controller as BaseController;

class DollController extends BaseController
{
	private $dollService;

	public function __construct(
		DollService $dollService)
	{
		$this->dollService = $dollService;
	}

	public function getDoll(string $guid)
	{
		return $this->dollService->getDoll($guid);
	}

	public function saveDoll(\Illuminate\Http\Request $request)
	{
		return $this->dollService->saveDoll($request->json()->all());
	}
}
