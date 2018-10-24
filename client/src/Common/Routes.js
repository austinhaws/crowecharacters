import {BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';
import {dispatchFieldChanged} from "../App/Reducers";

// https://github.com/ReactTraining/react-router/issues/5237
export const history = createBrowserHistory();

export class HistoryBrowserRouter extends BrowserRouter {
	history;
}

function go(route) {
	// dispatch the route so that the app rerenders
	dispatchFieldChanged(undefined, 'url', route);
	history.push(route);
}

// global routes for the site map
export default {
	admin: {
		home: () => go('/admin'),

		imageSet: {
			list: () => go('/admin/imageSet/list'),
			new: () => go('/admin/imageSet/edit/'),
			edit: guid => go(`/admin/imageSet/edit/${guid}`),
		}
	},

	// character: {
	// 	edit: characterGuid => go(`/character/edit/${characterGuid}`),
	// 	new: () => go('/character/new'),
	// 	print: characterGuid => go(`/character/print/${characterGuid}`),
	// },

	home: () => go('/'),
};
