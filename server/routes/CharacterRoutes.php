<?php

require_once('WebResponse.php');
require_once('dao/CharacterDao.php');
require_once('dao/CharacterXAccountDao.php');

$router->group(['prefix' => 'character'], function () use ($router) {

	// get all characters connected to this account id
	$router->get('all/{accountGuid}', function ($accountGuid) {
		$characters = characterDao()->selectAllByAccountGuid($accountGuid);
		return webResponse(cleanRecords($characters), $accountGuid);
	});

	$router->post('new/{accountGuid}', function ($accountGuid) {
		$account = accountDao()->selectByGuid($accountGuid);

		if (!$account || !$account->id) {
			exit("Unknown account: $accountGuid");
		}

		// create new record
		$characterId = characterDao()->insertCharacter([FIELD_GUID => uniqid(), FIELD_DATA => '{}']);

		// get the new record
		$character = characterDao()->selectCharacterById($characterId);

		// link to account
		characterXAccountDao()->linkCharacterAccount($characterId, $account->id);

		return webResponse(cleanRecord($character), $accountGuid);
	});
});
