const ACCOUNT_GUID = 'accountGuid';

export default {

	account: {
		getGuid: () => localStorage.getItem(ACCOUNT_GUID),
		setGuid: guid => localStorage.setItem(ACCOUNT_GUID, guid),
	},
};
