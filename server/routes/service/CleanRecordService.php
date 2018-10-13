<?php

class CleanRecordService {
	/**
	 * pull out ids and convert data to json
	 *
	 * @param object $record the record to be cleaned (by address so parameter is changed)
	 * @return object the cleaned record (for chaining)
	 */
	public function cleanRecord(&$record)
	{
		$records = is_array($record) ? $record : [$record];
		foreach ($records as $record) {
			unset($record->id);
		}

		// yes, return record so it remains an array/object, however it was passed in
		return $record;
	}
}

function cleanRecordService() {
	return new CleanRecordService();
}
