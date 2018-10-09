<?php

class CharacterDao {

	public function selectAllByAccountGuid(string $accountGuid)
	{
		return DB::table('characters')
			->select('characters.*')
			->join('characters_x_accounts', 'characters_x_accounts.characters_id', '=', 'characters.id')
			->join('accounts', 'characters_x_accounts.accounts_id', '=', 'accounts.id')
			->where('accounts.guid', $accountGuid)
			->get();
	}

	public function insertCharacter(array $character)
	{
		return DB::table('characters')->insertGetId($character);
	}

	public function selectCharacterById($characterId)
	{
		return DB::table('characters')->where('id', '=', $characterId)->first();
	}
}

function characterDao() {
	return new CharacterDao();
}
