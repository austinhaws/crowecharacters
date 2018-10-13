<?php

class CharacterXAccountDao {

//	public function linkCharacterAccount(int $characterId, int $accountId)
//	{
//		return DB::table('character_x_account')->insert(['character_id' => $characterId, 'account_id' => $accountId]);
//	}
}

function characterXAccountDao() {
	return new CharacterXAccountDao();
}
