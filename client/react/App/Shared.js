import reducers from "./Reducers";
import store from "./Store";
import axios from "axios";
import constants from "../Common/Constants";

const shared = {
	functions: {

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

