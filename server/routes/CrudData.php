<?php

/**
 * Class Crud
 * CRUDs a table. table must have an id, a guid field, and a data filed that is TEXT JSON
 */
class CrudData
{
	var $table;

	/**
	 * Crud constructor.
	 * @param $table string the table name for the data
	 */
	public function __construct($table)
	{
		$this->table = $table;
	}

	/**
	 * create a new record and return it
	 *
	 * @return object matching record
	 */
	public function create()
	{
		// create a new guid
		$guid = uniqid();

		// create new record
		DB::table($this->table)->insert([FIELD_GUID => $guid]);

		// return the new record
		return $this->read($guid);
	}

	/**
	 * get all the records
	 *
	 * @return array all records
	 */
	public function readAll()
	{
		$records = DB::table($this->table)->get();
		foreach ($records as $record) {
			$this->cleanRecord($record);
		}
		return $records;
	}

	/**
	 * get a record by guid
	 *
	 * @param $guid
	 * @return object the matching record
	 */
	public function read($guid)
	{
		$record = DB::table($this->table)->where(FIELD_GUID, $guid)->first();
		return $this->cleanRecord($record);
	}

	/**
	 * @param $guid string record identifier
	 * @param $data string json string of data
	 */
	public function update($guid, $data)
	{
		DB::table($this->table)->where(FIELD_GUID, $guid)->update(['data' => $data]);
	}

	/**
	 * @param $guid string record identifier
	 */
	public function delete($guid)
	{
		DB::table($this->table)->where(FIELD_GUID, $guid)->delete();
	}

	/**
	 * pull out ids and convert data to json
	 *
	 * @param object $record the record to be cleaned (by address so parameter is changed)
	 * @return object the cleaned record (for chaining)
	 */
	private function cleanRecord(&$record)
	{
		unset($record->id);
		$record->data = json_decode($record->data);
		return $record;
	}
}
