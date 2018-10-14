import store from '../App/Store';
import routes from "./Routes";

const roles = {
	// roles are undefined until they come from the server
	hasRole: role => store.getState().roles === undefined || store.getState().roles.includes(role),
	requireRole: role => (!roles.hasRole(role)) && routes.home(),

	roles: {
		ADMIN: 'admin',
	}
};


export default roles;
