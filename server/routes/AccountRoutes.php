<?php


$router->group(['prefix' => 'account'], function () use ($router) {

	function selectRandomWord($type) {
		$query = DB::table('account_words');
		$query->select('word');
		$query->orderByRaw('RAND()');
		$query->limit(1);
		$query->where('type', '=', $type);

		$records = $query->get();
		return $records[0]->word;
	}

	// get all characters connected to this account id
	$router->get('new', function () {
		do {
			$adjective = selectRandomWord('adjective');
			$noun = selectRandomWord('noun');
			$number = mt_rand(10, 99);

			$phrase = "$adjective$noun$number";

			$account = DB::table('accounts')->where('phrase', '=', $phrase)->get();
		} while (count($account));

		$guid = uniqid();
		DB::table('accounts')->insert(['guid' => $guid, 'phrase' => $phrase]);

		$record = DB::table('accounts')->where(FIELD_GUID, $guid)->first();

		return response(json_encode(cleanRecord($record)));
	});

	$router->get('get/{phrase}', function ($phrase) {
		return response(json_encode(DB::table('accounts')->where('phrase', '=' , $phrase)->first()));
	});
});
