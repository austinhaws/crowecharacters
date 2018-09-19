import reducers from "./Reducers";
import store from "./Store";
import axios from "axios";
import constants from "../Common/Constants";

const shared = {
	functions: {
		/**
		 * a field on an object in the store has changed
		 * @param objectPath dot notation path to the object in the store
		 * @param field the field on the object
		 * @param value the new value
		 */
		dispatchFieldChanged: (objectPath, field, value) => store.dispatch({ type: reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {path: objectPath, field: field, value: value }}),

		startAjax: () => store.dispatch({type: reducers.ACTION_TYPES.SET_AJAXING, payload: true,}),
		stopAjax: () => store.dispatch({type: reducers.ACTION_TYPES.SET_AJAXING, payload: false}),

		/**
		 * make an ajax call; takes care of ajaxing flag setting and error logging
		 *
		 * @param url - the url to call
		 * @param method - POST / GET
		 * @param data - js object of the data to send
		 * @param callback - function to get the results of the ajax call
		 */
		ajax: (method, url, data, callback) => {
			shared.functions.startAjax();

			axios[method](constants.urlBase + url, data)
				.then(result => callback ? callback(result.data) : undefined)
				.catch(e => console.error('ajax error', e))
				.finally(() => shared.functions.stopAjax());
		},
	},
};

export default shared;

