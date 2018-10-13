<?php


class RolesDao {

	public function selectByAccountGuid(string $accountGuid)
	{
		return DB::table('role')
			->select('role' . '.*')
			->join('account_x_role', 'role.id', '=', 'account_x_role.role_id')
			->join('account', 'account.id', '=', 'account_x_role.account_id')
			->where('account.guid', '=' , $accountGuid)
			->get();
	}
}

function rolesDao() {
	return new RolesDao();
}
