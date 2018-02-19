import React from "react";
import clone from "clone";

let reducers = {
	ACTION_TYPES: {
		// set ajaxing start/stop
		SET_AJAXING: 'SET_AJAXING',
		// set a field on any object by a dot path in the state
		SET_OBJECT_FIELD: 'SET_OBJECT_FIELD',
	}
};

/*
 !! make sure to always create a copy of state instead of manipulating state directly
 action = {
 type: constant action name (required),
 error: error information (optional),
 payload: data for action (optional),
 meta: what else could you possibly want? (optional)
 }
 */

// reducer: update ajaxing count
// payload: boolean true for an ajax began, false an ajax ended
reducers[reducers.ACTION_TYPES.SET_AJAXING] = (state, action) => {
	const result = clone(state);
	result.ajaxingCount += action.payload ? 1 : -1;
	if (!result.ajaxingCount && result.newing) {
		result.newing.setList(result, result.newing.persons);
	}
	return result;
};

// reducer: sets a field in an object in the state
// payload: path = path to object in dot notation, field = field name in that object, value = new value for that field
reducers[reducers.ACTION_TYPES.SET_OBJECT_FIELD] = (state, action) => {
	const result = clone(state);
	// split path by '.', apply to state to get to object, put vale in that object
	action.payload.path.split('\.').reduce((obj, field) => field ? obj[field] : obj, result)[action.payload.field] = clone(action.payload.value);
	return result;
};

export default reducers;
