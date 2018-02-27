<?php


$router->group(['prefix' => 'character'], function () use ($router) {

	// get all characters connected to this account id
	$router->get('all/{accountGuid}', function ($accountGuid) {
		$query = DB::table('characters');

		$query->select('characters.*');

		$query->join('characters_x_accounts', 'characters_x_accounts.character_id', '=', 'characters.id');
		$query->join('accounts', 'characters_x_accounts.account_id', '=', 'accounts.id');

		$query->where('accounts.guid', $accountGuid);

		$records = $query->get();

		foreach ($records as $record) {
			cleanRecord($record);
		}

		return response($records);
	});
});
