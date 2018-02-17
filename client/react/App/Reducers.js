import React from "react";

let reducers = {
	ACTION_TYPES: {
		// set ajaxing start/stop
		SET_AJAXING: 'SET_AJAXING',
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
	const result = Object.assign({}, state);
	result.ajaxingCount += action.payload ? 1 : -1;
	if (!result.ajaxingCount && result.newing) {
		result.newing.setList(result, result.newing.persons);
	}
	return result;
};

export default reducers;
