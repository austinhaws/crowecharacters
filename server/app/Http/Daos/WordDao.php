<?php

namespace App\Http\Daos;

use Illuminate\Support\Facades\DB;

class WordDao extends BaseDao
{

	function knownFields()
	{
		return [
			'id',
			'word_type_id',
			'word',
		];
	}
	
	/**
	 * randomly select a word for a passphrase by type
	 *
	 * @param $type string [adjective|noun]
	 * @return string
	 */
	public function selectRandomWord($type)
	{
		return DB::table('word')
			->select('word')
			->join('word_type', 'word.word_type_id', '=', 'word_type.id')
			->orderByRaw('RAND()')
			->limit(1)
			->where('word_type.type', '=', $type)->get()[0]->word;
	}
}
