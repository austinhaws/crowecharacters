import store from "../App/Store";
import {dispatchFieldChanged} from "../App/Reducers";
import {AjaxStatusCore, WebserviceCore} from "dts-react-common";
import storage from "./LocalStorage";

export const ajaxStatusCore = new AjaxStatusCore();
const webserviceCore = new WebserviceCore({
	baseUrl: globals.urlBase,
	ajaxStatusCore: ajaxStatusCore,
	allResultsCallback: response => {
		dispatchFieldChanged(undefined, 'roles', response.roles);
		return response.data;
	},
	loadDefaultsCallback: defaults => defaults.headers.common['Authorization'] = storage.account.getPhrase(),
});


// !!!!!!!!!  Make sure to add calls to TestWebservice.js !!!!!!! //
const webservice = {

	account: {
		get: () => webserviceCore.get(`account/get`),
	},


	body: {
		all: () => webserviceCore.get(`body/all/${store.getState().account.guid}`).then(data => {
			dispatchFieldChanged(undefined, 'bodies', data);
			return data;
		}),

		save: body => webserviceCore.post(`body/save/${body.guid}`, { data: JSON.stringify(body.data) }),

		create: (file, bodyData) =>
			// upload file
			webservice.file.upload(file, 'body')
				.then(fileGuid => {
					// store off file id
					bodyData.fileGuid = fileGuid;
					// post for new empty body (return promise from this so that caller gets this promise for its "then")
					return webserviceCore.post('body/new')
				})
				.then(bodyGuidData => webservice.body.save({guid: bodyGuidData.guid, data: bodyData}).then(() => bodyGuidData))
				.then(bodyGuidData => webservice.body.all().then(() => bodyGuidData.guid)),
	},


	character: {
		all: () => webserviceCore.get(`character/all/${store.getState().account.guid}`)
			.then(characters => {
				dispatchFieldChanged(undefined, 'characters', characters);
				return characters;
			}),

		create: character => webserviceCore.post(`character/new/${store.getState().account.guid}`)
			.then(data => {
				character.guid = data.guid;
				return webservice.character.update(character).then(() => character);
			})
			.then(character => webservice.character.all().then(() => character))
			.then(character => character.guid),

		update: character => webserviceCore.post(`character/save/${character.guid}`, { data: JSON.stringify(character.data) })
			.then(result => webservice.character.all().then(() => result)),
	},

	file: {
		all: () => webserviceCore.get(`file/all/${store.getState().account.guid}`)
			.then(data => {
				dispatchFieldChanged(undefined, 'files', data);
				return data;
			}),

		upload: (file, fileType) => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append('fileType', fileType);
			return webserviceCore.post('file/upload', formData);
		}
	}
};

export default webservice;
