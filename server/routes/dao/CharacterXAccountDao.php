<?php

class CharacterXAccountDao {

	public function linkCharacterAccount(int $characterId, int $accountId)
	{
		return DB::table('characters_x_accounts')->insert(['characters_id' => $characterId, 'accounts_id' => $accountId]);
	}
}

function characterXAccountDao() {
	return new CharacterXAccountDao();
}
