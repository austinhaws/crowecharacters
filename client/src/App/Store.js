import {createStore} from "redux";
import reducers from "./Reducers.js";

// export so that the app can set values back to default values for like when a page's data needs reset
export const defaultState = {
	// === default data ===

	// cached data from server
	account: undefined,
	roles: undefined,
	globalData: {
		imageSets: undefined,
		imageCategories: undefined,
	},

	accountDolls: undefined,

	imageSetEdit: {
		guid: undefined,
		name: '',
		images: [],
	},

	editDoll: {
		doll: undefined,
		imageSet: undefined,
	},

	// // New Character view
	// printCharacter: {
	// 	character: undefined,
	// },
	//
	// selectCharacter: {
	// 	searchText: '',
	// },
	//
	// newImage: {
	// 	// can't put file here because it's not serializable for clone
	// 	// file: undefined,
	// },
};

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
	},
	defaultState,
    // for chrome redux plugin
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

);
export default store;
