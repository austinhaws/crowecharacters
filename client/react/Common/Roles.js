import store from '../App/Store';

export default {
	hasRole: role => store.getState().roles && store.getState().roles.includes(role),
};

