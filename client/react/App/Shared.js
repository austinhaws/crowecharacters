import reducers from "./Reducers";
import store from "./Store";
import axios from "axios";
import webservice from "../Common/Webservice";

const shared = {
	functions: {
		/**
		 * a field on an object in the store has changed
		 * @param objectPath dot notation path to the object in the store
		 * @param field the field on the object
		 * @param value the new value
		 */
		dispatchFieldChanged: (objectPath, field, value) => store.dispatch({ type: reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {path: objectPath, field: field, value: value }}),

		bodyByGuid: guid => guid ? store.getState().bodies.find(body => body.guid === guid) : undefined,
		fileByGuid: guid => guid ? store.getState().files.find(file => file.guid === guid) : undefined,
		filesForBodyImages: body => body ? body.data.images.map(image => store.getState().files.find(file => file.guid === image.fileGuid)) : undefined,
		characterByGuid: guid => guid ? store.getState().characters.find(character => character.guid === guid) : undefined,

		/**
		 * the app has started, go get the lists of data that are needed like bodies, images, characters, etc
		 */
		appStartup: () => {
			webservice.account.load(() => {
				webservice.body.all();
				webservice.file.all();
				webservice.character.all()
			});
		},

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

			axios[method](shared.constants.urlBase + url, data)
				.then(result => callback ? callback(result.data) : undefined)
				.catch(e => console.error('ajax error', e))
				.finally(() => shared.functions.stopAjax());
		},
	},

	constants: {
		urlBase: globals.urlBase,
	}
};

export default shared;

