import {objectAtPathReducer} from "dts-react-common";
import store from "./Store";
import clone from "clone";


/**
 * a field on an object in the store has changed
 * @param objectPath dot notation path to the object in the store
 * @param field the field on the object
 * @param value the new value
 */
export const dispatchFieldChanged = (objectPath, field, value) => {
	store.dispatch({type: reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {path: objectPath, field: field, value: value}});
};
export const dispatchField = (path, value) => {
	const parts = path.split('.');
	const partsPath = parts.length > 1 ? parts.slice(0, parts.length - 1).join('.') : undefined;
	dispatchFieldChanged(partsPath || undefined, parts[parts.length - 1], value);
};


let reducers = {
	ACTION_TYPES: {
		// set a field on any object by a dot path in the state
		SET_OBJECT_FIELD: 'SET_OBJECT_FIELD',
		// setting the url causes a full rerender, so do a full clone
		FULL_CLONE: 'FULL_CLONE',
	}
};

// reducer: sets a field in an object in the state
// payload: path = path to object in dot notation, field = field name in that object, value = new value for that field
reducers[reducers.ACTION_TYPES.SET_OBJECT_FIELD] = objectAtPathReducer;

// does a full clone and sets url
reducers[reducers.ACTION_TYPES.FULL_CLONE] = (state, action) => objectAtPathReducer(clone(state), action);

export default reducers;
