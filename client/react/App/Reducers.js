import {objectAtPathReducer} from "dts-react-common";
import store from "./Store";


/**
 * a field on an object in the store has changed
 * @param objectPath dot notation path to the object in the store
 * @param field the field on the object
 * @param value the new value
 */
export const dispatchFieldChanged = (objectPath, field, value) => {
	store.dispatch({type: reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {path: objectPath, field: field, value: value}});
};


let reducers = {
	ACTION_TYPES: {
		// set a field on any object by a dot path in the state
		SET_OBJECT_FIELD: 'SET_OBJECT_FIELD',
	}
};

// reducer: sets a field in an object in the state
// payload: path = path to object in dot notation, field = field name in that object, value = new value for that field
reducers[reducers.ACTION_TYPES.SET_OBJECT_FIELD] = objectAtPathReducer;

export default reducers;
