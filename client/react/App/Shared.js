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
					store.dispatch({type: reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {field: 'account', value: account}});

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
			all: () => shared.functions.ajax('get', 'body/all', undefined, data => store.dispatch({type: reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {path: '', field: 'bodies', value: data}})),
		},

		character: {
			all: () => shared.functions.ajax('get', 'character/all', undefined, characters => store.dispatch({type:reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {path: '', field: 'characters', value: characters}})),
			create: (character, callback) => shared.functions.ajax('post', 'character/new', undefined, data => {
				character.guid = data.guid;
				shared.ajax.character.update(character, () => callback(data.guid));
			}),
			update: (character, callback) => shared.functions.ajax('post', `character/save/${character.guid}`, {data: JSON.stringify(character.data)}, result => {
				shared.ajax.character.all();
				callback(result);
			}),
		},

		file: {
			all: () => shared.functions.ajax('get', 'file/all', undefined, data => store.dispatch({type: reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {path: '', field: 'files', value: data}})),
}
	},

	functions: {
		/**
		 * a field on an object in the store has changed
		 * @param objectPath dot notation path to the object in the store
		 * @param field the field on the object
		 * @param value the new value
		 */
		dispatchFieldChanged: (objectPath, field, value) => store.dispatch({type: reducers.ACTION_TYPES.SET_OBJECT_FIELD, payload: {path: objectPath, field: field, value: value}}),

		bodyByGuid: guid => store.getState().bodies.find(body => body.guid === guid),
		fileByGuid: guid => store.getState().files.find(file => file.guid === guid),

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
				.then(result => callback(result.data))
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
	},

	images: {
		magnifyingGlass: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129" enableBackground="new 0 0 129 129"><g><path d="M51.6,96.7c11,0,21-3.9,28.8-10.5l35,35c0.8,0.8,1.8,1.2,2.9,1.2s2.1-0.4,2.9-1.2c1.6-1.6,1.6-4.2,0-5.8l-35-35   c6.5-7.8,10.5-17.9,10.5-28.8c0-24.9-20.2-45.1-45.1-45.1C26.8,6.5,6.5,26.8,6.5,51.6C6.5,76.5,26.8,96.7,51.6,96.7z M51.6,14.7   c20.4,0,36.9,16.6,36.9,36.9C88.5,72,72,88.5,51.6,88.5c-20.4,0-36.9-16.6-36.9-36.9C14.7,31.3,31.3,14.7,51.6,14.7z"/></g></svg>,
		male: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 250"><path d="M 154.84457,3.0003138 146.81503,17.05201 h 20.07387 l -37.13664,37.136628 a 79.291719,79.291718 0 1 0 16.05908,16.059083 l 37.13663,-37.136627 v 20.073853 l 14.05171,-8.029542 V 3.0003138 H 154.84457 z M 82.578691,60.210794 a 57.210483,57.210483 0 0 1 0,114.420956 57.210483,57.210483 0 1 1 0,-114.420956 z"/></svg>,
		female: () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 150 225"><path d="m 79.5,132 a 65,65 0 1 0 -23,0 v 22 h -26 v 21 h 26 v 27 h 23 v -27 H 104.5 v -21 H 79.5 v -22 z M 116.5,68 a 48,48 0 0 1 -96,0 48,48 0 1 1 96,0 z"/></svg>,
	},

	constants: {
		urlBase: 'http://localhost/crowe/server/public/',
	}
};

export default shared;
