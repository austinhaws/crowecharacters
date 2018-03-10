import React from "react";
import {createStore} from "redux";
import reducers from "./Reducers.js";

const store = createStore((state, action) => {
		// === reducers ===
		let reducer = false;

		// is reducer valid?
		if (action.type in reducers) {
			reducer = reducers[action.type];
		}

		// ignore redux/react "system" reducers
		if (!reducer && action.type.indexOf('@@') !== 0) {
			console.error('unknown reducer action:', action.type, action)
		}

		// DO IT!
		return reducer ? reducer(state, action) : state;
	}, {
		// === default data ===

		ajaxingCount: 0,

		// cached data from server
		bodies: [],
		files: [],
		characters: [],
		account: undefined,

		// New Character view
		newCharacter: {
			editingCharacter: {data: {name: '', bodyGuid: ''}},
			searchText: '',
		},

		// Edit Character view
		editCharacter: {
			character: undefined,
			filters: {
				groupBy: 'bodyPart',
				search: '',
				openGroup: '',
			}
		},

		selectCharacter: {
			searchText: '',
		},

		newImage: {
			// can't put file here because it's not serializable for clone
			// file: undefined,
		},
	}
    // for chrome redux plugin
    , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);
export default store;
