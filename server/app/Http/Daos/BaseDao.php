<?php

namespace App\Http\Daos;

abstract class BaseDao
{
	/**
	 * @return array list of fields known in the table so that insert records can only send those fields
	 */
	abstract function knownFields();

	/**
	 * strips any field that are not known database fields from the record
	 *
	 * @param $record array record with possible extra fields
	 * @return array cleaned record
	 */
	public function cleanDaoRecord($record) {
		$result = [];

		foreach ($this->knownFields() as $field) {
			if (isset($record[$field])) {
				$result[$field] = $record[$field];
			}
		}

		return $result;
	}
}
