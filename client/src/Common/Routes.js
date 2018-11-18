import {BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';

// https://github.com/ReactTraining/react-router/issues/5237
export const history = createBrowserHistory();

export class HistoryBrowserRouter extends BrowserRouter {
	history;
}

function go(route) {
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

	doll: {
		new: imageSetGuid => go(`/doll/new/${imageSetGuid}`),
		edit: dollGuid => go(`/doll/edit/${dollGuid}`),
		print: dollGuid => go(`/doll/print/${dollGuid}`),
	},

	home: () => go('/'),

	back: () => history.goBack(),
};
