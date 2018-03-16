import React from "react";
import reducers from "./Reducers";
import store from "./Store";
import axios from "axios";

const shared = {
	ajax: {
		account: {
			load: callback => {
				// get current account guid from localstorage
				const accountGuid = localStorage.getItem('accountPhrase');

				// if not found, then create new account
				const accountCallback = account => {
					// store accountGuid in localstorage
					localStorage.setItem('accountPhrase', account.phrase);

					// dispatch set account information
					store.dispatch(shared.functions.objectFieldReducer(undefined, 'account', account));

					// call callback
					callback(account);
				};

				if (accountGuid) {
					shared.ajax.account.get(accountGuid, accountCallback);
				} else {
					shared.ajax.account.new(accountCallback);
				}
			},
			new: callback => shared.functions.ajax('get', 'account/new', undefined, callback),
			get: (phrase, callback) => shared.functions.ajax('get', `account/get/${phrase}`, undefined, callback)
		},
		body: {
			all: () => shared.functions.ajax('get', 'body/all', undefined, data => store.dispatch(shared.functions.objectFieldReducer(undefined, 'bodies', data))),
			/**
			 * save a body
			 *
			 * @param body the full body record to save
			 * @param callback on finish, the result (success message)
			 */
			save: (body, callback) => shared.functions.ajax('post', `body/save/${body.guid}`, {data: JSON.stringify(body.data)}, callback),
		},

		character: {
			all: callback => shared.functions.ajax('get', 'character/all', undefined, characters =>
				{store.dispatch(shared.functions.objectFieldReducer(undefined, 'characters', characters));
				if (callback) {
					callback();
				}
			}),
			create: (character, callback) => shared.functions.ajax('post', `character/new/${store.getState().account.guid}`, undefined, data => {
				character.guid = data.guid;
				shared.ajax.character.update(character, () => {
					shared.ajax.character.all();
					callback(data.guid);
				});
			}),
			update: (character, callback) => shared.functions.ajax('post', `character/save/${character.guid}`, {data: JSON.stringify(character.data)}, result => shared.ajax.character.all(() => callback ? callback(result) : undefined)),
		},

		file: {
			all: callback => shared.functions.ajax('get', 'file/all', undefined, data => {
				store.dispatch(shared.functions.objectFieldReducer(undefined, 'files', data));
				if (callback) {
					callback();
				}
			}),

			/**
			 * upload a file and get its guid back
			 *
			 * @param file file content from the upload file button
			 * @param fileType what type of file it is (body, article)
			 * @param callback gets the new guid back as a parameter with which you can then add to a body or do whatever you want
			 */
			upload: (file, fileType, callback) => {
				const formData = new FormData();
				formData.append("file", file);
				formData.append('fileType', fileType);
				shared.functions.ajax('post', 'file/upload', formData, callback);
			}
		}
	},

	functions: {
		/**
		 * create a reducer for setting a field in an object
		 *
		 * @param path path to the object in the store
		 * @param field which field in the object to set
		 * @param value the new value for that field
		 * @return {{type: string, payload: {path: *, field: *, value: *}}}
		 */
		objectFieldReducer: (path, field, value) => {
			return {type: reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {path: path, field: field, value: value}}
		},

		/**
		 * a field on an object in the store has changed
		 * @param objectPath dot notation path to the object in the store
		 * @param field the field on the object
		 * @param value the new value
		 */
		dispatchFieldChanged: (objectPath, field, value) => store.dispatch(shared.functions.objectFieldReducer(objectPath, field, value)),

		bodyByGuid: guid => guid ? store.getState().bodies.find(body => body.guid === guid) : undefined,
		fileByGuid: guid => guid ? store.getState().files.find(file => file.guid === guid) : undefined,
		filesForBodyImages: body => body ? body.data.images.map(image => store.getState().files.find(file => file.guid === image.fileGuid)) : undefined,
		characterByGuid: guid => guid ? store.getState().characters.find(character => character.guid === guid) : undefined,

		/**
		 * the app has started, go get the lists of data that are needed like bodies, images, characters, etc
		 */
		appStartup: () => {
			shared.ajax.account.load(() => {
				shared.ajax.body.all();
				shared.ajax.file.all();
				shared.ajax.character.all()
			})
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

		/**
		 * join an array of classNames together; filter empties
		 *
		 * @param classes
		 * @return {string}
		 */
		joinClasses: classes => classes ? classes.filter(c => c).join(' ') : '',

		// split path by '.', apply to baseObj to get to next object
		objectAtPath: (baseObject, path) => (path || '').split('\.').reduce((obj, field) => field ? obj[field] : obj, baseObject),

		/**
		 * prevent default, stop propagation, stop immediate propagation
		 * all this to prevent anything else from firing after this method is called
		 * helpful for click events
		 *
		 * @param func the func to call
		 * @param bind the "this" to bind when calling
		 * @return {function(*=)} function for a callback
		 */
		handleEvent: (func, bind) => e => {
			if (e.preventDefault) {
				e.preventDefault();
			}
			if (e.stopPropagation) {
				e.stopPropagation();
			}
			if (e.nativeEvent && e.nativeEvent.stopImmediatePropagation) {
				e.nativeEvent.stopImmediatePropagation();
			}
			(bind ? func.bind(bind) : func)(e);
		},
	},

	images: {
		magnifyingGlass: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enableBackground="new 0 0 129 129"><g><path d="M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z"/></g></svg>,
		male: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 250"><path d="M 154.84457,3.0003138 146.81503,17.05201 h 20.07387 l -37.13664,37.136628 a 79.291719,79.291718 0 1 0 16.05908,16.059083 l 37.13663,-37.136627 v 20.073853 l 14.05171,-8.029542 V 3.0003138 H 154.84457 z M 82.578691,60.210794 a 57.210483,57.210483 0 0 1 0,114.420956 57.210483,57.210483 0 1 1 0,-114.420956 z"/></svg>,
		female: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 225"><path d="m 79.5,132 a 65,65 0 1 0 -23,0 v 22 h -26 v 21 h 26 v 27 h 23 v -27 H 104.5 v -21 H 79.5 v -22 z M 116.5,68 a 48,48 0 0 1 -96,0 48,48 0 1 1 96,0 z"/></svg>,
		backArrow: () => <svg viewBox="0 0 20.57 38" xmlns="http://www.w3.org/2000/svg"><g><polyline className="cls-1" points="18.54 2 2 18.86 18.57 36"/></g></svg>,
		checkMark: () => <svg viewBox="0 0 72 72"><path d="M71,4.775c-14.537-5.172-38.086,23.767-52.65,64.7c4.764-13.388-2.835-28.299-16.99-33.335"/></svg>,
		roundBox: () => <svg viewBox="-3 -3 75 75"><path d="M71.584,65.257c0,3.725-3.018,6.743-6.739,6.743H6.323c-3.721,0-6.738-3.019-6.738-6.743V6.738C-0.416,3.018,2.602,0,6.323,0h58.522c3.722,0,6.739,3.018,6.739,6.739V65.257z"/></svg>,
	},

	constants: {
		urlBase: 'http://localhost/crowe/server/public/',
	}
};

export default shared;

