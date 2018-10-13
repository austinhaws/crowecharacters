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
		} else if (is_array($record)) {
			unset($record['id']);
		}
	}
}

function cleanRecordService() {
	return new CleanRecordService();
}
