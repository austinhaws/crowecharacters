import {dispatchFieldChanged} from "../App/Reducers";
import {AjaxStatusCore, WebserviceCore} from "dts-react-common";
import storage from "./LocalStorage";

export const ajaxStatusCore = new AjaxStatusCore();
const webserviceCore = new WebserviceCore({
	baseUrl: globals.urlBase,
	ajaxStatusCore: ajaxStatusCore,
	allResultsCallback: response => {
		response && dispatchFieldChanged(undefined, 'roles', response.roles);
		return response && response.data;
	},
	loadDefaultsCallback: defaults => defaults.headers.common['Authorization'] = storage.account.getGuid(),
});


// !!!!!!!!!  Make sure to add calls to TestWebservice.js !!!!!!! //
const webservice = {

	account: {
		get: () => webserviceCore.get(`account/get`).then(account => {
			account.guid && storage.account.setGuid(account.guid);
			return account;
		}),
	},

	imageSet: {
		all: () => webserviceCore.get('imageset/all').then(imageSets => {
			dispatchFieldChanged('globalData', 'imageSets', imageSets);
			return imageSets;
		}),
		delete: imageSetGuid => webserviceCore.get(`imageset/delete/${imageSetGuid}`),
		get: imageSetGuid => webserviceCore.get(`imageset/get/${imageSetGuid}`),
		save: imageSet => webserviceCore.post(`imageset/save`, imageSet),
	},

	image: {
		upload: file => {
			const formData = new FormData();
			formData.append("file", file);
			return webserviceCore.post('image/upload', formData);
		},
		tieToImageSet: (imageGuid, imageSetGuid, zIndex) => webserviceCore.get(`image/connect/${imageGuid}/${imageSetGuid}/${zIndex}`),
		save: image => webserviceCore.post(`image/save`, image),
		delete: imageGuid => webserviceCore.get(`image/delete/${imageGuid}`),
	},

	imageSetXImage: {
		save: (imageGuid, zIndex) => webserviceCore.post('imageSetXImage/save', { imageGuid, zIndex }),
	},
};

export default webservice;
