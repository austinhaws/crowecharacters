import {history} from './HistoryListener';

export default {
	goBack: () => history.goBack(),

	admin: {
		body: {
			edit: (bodyGuid, imageGuid = undefined) => history.push(`/admin/body/edit/${this.props.bodyGuid}${imageGuid ? `/${imageGuid}` : ''}`),
			new: () => history.push('/admin/body/new'),
			list: () => history.push('/admin/body/list'),
		},

		image: {
			new: bodyGuid => history.push(`/admin/image/new/${bodyGuid}`),
		},
	},

	character: {
		edit: characterGuid => history.push(`/character/edit/${characterGuid}`),
		new: () => history.push('/character/new'),
		print: characterGuid => history.push(`/character/print/${characterGuid}`),
	},

	home: () => history.push('/'),

	// use this sparingly, should use the direct routes provided above to prevent ambiguity
	push: history.push,
};
