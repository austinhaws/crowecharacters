import {objectAtPathReducer} from "dts-react-common";


let reducers = {
	ACTION_TYPES: {
		// set ajaxing start/stop
		SET_AJAXING: 'SET_AJAXING',
		// set a field on any object by a dot path in the state
		SET_OBJECT_FIELD: 'SET_OBJECT_FIELD',
	}
};

// reducer: update ajaxing count
// payload: boolean truey for an ajax began, falsey an ajax ended
reducers[reducers.ACTION_TYPES.SET_AJAXING] = (state, action) => {
	return Object.assign({...state}, { ajaxingCount: state.ajaxingCount + (action.payload ? 1 : -1) });
};

// reducer: sets a field in an object in the state
// payload: path = path to object in dot notation, field = field name in that object, value = new value for that field
reducers[reducers.ACTION_TYPES.SET_OBJECT_FIELD] = objectAtPathReducer;

export default reducers;
