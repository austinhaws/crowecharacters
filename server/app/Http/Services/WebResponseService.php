<?php

namespace App\Http\Services;

use App\Http\Daos\RolesDao;

class WebResponseService
{
	private $rolesDao;
	private $cleanRecordService;

	public function __construct(RolesDao $rolesDao, CleanRecordService $cleanRecordService)
	{
		$this->rolesDao = $rolesDao;
		$this->cleanRecordService = $cleanRecordService;
	}

	public function response($data)
	{
		$accountGuid = app('request')->header('Authorization');
		return response()->json([
			'errors' => null,
			'roles' => $accountGuid ? array_map(function ($role) {
				return $role->role;
			}, $this->rolesDao->selectByAccountGuid($accountGuid)->all()) : [],
			'data' => $this->cleanRecordService->cleanRecord($data),
		], 200, [], JSON_UNESCAPED_UNICODE);
	}
}
