<?php

namespace App\Http\Services;

class CleanRecordService {
	/**
	 * pull out ids and convert data to json
	 *
	 * @param object|array $record the record to be cleaned (by address so parameter is changed)
	 * @return object|array the cleaned record (for chaining)
	 */
	public function cleanRecord(&$record)
	{
		if (is_array($record) && !isset($record['id'])) {
			foreach ($record as $key => $dontuse) {
				$this->cleanSingleRecord($record[$key]);
			}
		} else {
			$this->cleanSingleRecord($record);
		}

		// yes, return record so it remains an array/object, however it was passed in
		return $record;
	}

	private function cleanSingleRecord(&$record) {
		if (is_object($record)) {
			unset($record->id);
			unset($record->image_id);
			unset($record->image_set_id);
		} else if (is_array($record)) {
			unset($record['id']);
			unset($record['image_id']);
			unset($record['image_set_id']);
		}
	}
}
