import React from "react";
import reducers from "./Reducers";
import store from "./Store";

const shared = {
	functions: {
		/**
		 * a field on an object in the store has changed
		 * @param objectPath dot notation path to the object in the store
		 * @param field the field on the object
		 * @param value the new value
		 */
		dispatchFieldChanged: (objectPath, field, value) => store.dispatch({type: reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {path: objectPath, field: field, value: value}}),

		/**
		 * the app has started, go get the lists of data that are needed like bodies, images, characters, etc
		 */
		appStartup: () => {},
	}
};

export default shared;
