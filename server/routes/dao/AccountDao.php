<?php

class AccountDao {

	public function selectByGuid(string $guid)
	{
		return DB::table('accounts')->where('guid', '=' , $guid)->first();
	}

	public function selectById(int $id)
	{
		return DB::table('accounts')->where('id', '=' , $id)->first();
	}

	/**
	 * randomly select a word for a passphrase by type
	 *
	 * @param $type string [adjective|noun]
	 * @return string
	 */
	private function selectRandomWord($type) {
		return DB::table('account_words')
			->select('word')
			->orderByRaw('RAND()')
			->limit(1)
			->where('type', '=', $type)->get()[0]->word;
	}

	public function insert()
	{
		do {
			$adjective = $this->selectRandomWord('adjective');
			$noun = $this->selectRandomWord('noun');
			$number = mt_rand(10, 99);

			$phrase = "$adjective$noun$number";

			$guidAccounts = $this->selectByPhrase($phrase);
		} while ($guidAccounts);


		return $this->selectById(DB::table('accounts')->insertGetId([
			'guid' => uniqid(),
			'phrase' => $phrase,
		]));
	}

	public function selectByPhrase($phrase)
	{
		return DB::table('accounts')->where('phrase', '=' , $phrase)->first();
	}

	public function update($guid, $data)
	{
		return DB::table('accounts')->where('guid', '=', $guid)->update(['data' => $data]);
	}
}

function accountDao() {
	return new AccountDao();
}
