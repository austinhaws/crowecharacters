<?php

class CharacterDao {

//	public function selectAllByAccountGuid(string $accountGuid)
//	{
//		return DB::table('account')
//			->select('character.*')
//			->join('character_x_account', 'character_x_account.character_id', '=', 'character.id')
//			->join('accounts', 'character_x_account.account_id', '=', 'account.id')
//			->where('account.guid', $accountGuid)
//			->get();
//	}
//
//	public function insertCharacter(array $character)
//	{
//		return DB::table('account')->insertGetId($character);
//	}
//
//	public function selectCharacterById($characterId)
//	{
//		return DB::table('account')->where('id', '=', $characterId)->first();
//	}
}

function characterDao() {
	return new CharacterDao();
}
