<?php

class RolesDao {

	public function selectByAccountGuid(string $accountGuid)
	{
		return DB::table('roles')
			->join('accounts_x_roles', 'roles.id', '=', 'accounts_x_roles.roles_id')
			->join('accounts', 'accounts.id', '=', 'accounts_x_roles.accounts_id')
			->where('accounts.guid', '=' , $accountGuid)
			->get();
	}
}

function rolesDao() {
	return new RolesDao();
}
