<?php

require_once('WebResponse.php');

$router->group(['prefix' => 'character'], function () use ($router) {

	// get all characters connected to this account id
	$router->get('all/{accountGuid}', function ($accountGuid) {
		$query = DB::table('characters');

		$query->select('characters.*');

		$query->join('characters_x_accounts', 'characters_x_accounts.characters_id', '=', 'characters.id');
		$query->join('accounts', 'characters_x_accounts.accounts_id', '=', 'accounts.id');

		$query->where('accounts.guid', $accountGuid);

		$records = $query->get();

		foreach ($records as $record) {
			cleanRecord($record);
		}

		return webResponse($records);
	});

	$router->post('new/{accountGuid}', function ($accountGuid) {

		$account = DB::table('accounts')->where(FIELD_GUID, '=', $accountGuid)->first();

		if (!$account || !$account->id) {
			exit("Unknown account: $accountGuid");
		}

		// create new record
		$characterId = DB::table('characters')->insertGetId([FIELD_GUID => uniqid(), FIELD_DATA => '{}']);

		// get the new record
		$character = DB::table('characters')->where('id', '=', $characterId)->first();

		// link to account
		DB::table('characters_x_accounts')->insert(['characters_id' => $characterId, 'accounts_id' => $account->id]);

		return webResponse(cleanRecord($character));
	});
});
