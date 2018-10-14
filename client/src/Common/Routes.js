import {BrowserRouter} from 'react-router-dom';
import {createBrowserHistory} from 'history';

// https://github.com/ReactTraining/react-router/issues/5237
export const history = createBrowserHistory();

export class HistoryBrowserRouter extends BrowserRouter {
	history;
}

// global routes for the site map
export default {
	admin: {
		home: () => history.push('/admin'),
		// body: {
		// 	edit: (bodyGuid, imageGuid = undefined) => history.push(`/admin/body/edit/${history.bodyGuid}${imageGuid ? `/${imageGuid}` : ''}`),
		// 	new: () => history.push('/admin/body/new'),
		// 	list: () => history.push('/admin/body/list'),
		// },
		//
		// image: {
		// 	new: bodyGuid => history.push(`/admin/image/new/${bodyGuid}`),
		// },

		imageSet: {
			list: () => history.push('/admin/imageSet/list'),
			new: () => history.push('/admin/imageSet/edit/'),
			edit: guid => history.push(`/admin/imageSet/edit/${guid}`),
		}
	},

	// character: {
	// 	edit: characterGuid => history.push(`/character/edit/${characterGuid}`),
	// 	new: () => history.push('/character/new'),
	// 	print: characterGuid => history.push(`/character/print/${characterGuid}`),
	// },

	home: () => history.push('/'),
};
