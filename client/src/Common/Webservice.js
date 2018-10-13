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
		all: () => webserviceCore.get('imageset/all'),
		save: imageSet => webserviceCore.post(`imageset/save`, imageSet),
		get: imageSetGuid => webserviceCore.get(`imageset/get/${imageSetGuid}`),
	},


	body: {
		all: () => console.log/*webserviceCore.get(`body/all/${store.getState().account.guid}`).then(data => {
			dispatchFieldChanged(undefined, 'bodies', data);
			return data;
		})*/,

		save: body => console.log/*webserviceCore.post(`body/save/${body.guid}`, { data: JSON.stringify(body.data) })*/,

		create: (file, bodyData) =>
			console.log/*// upload file
			webservice.file.upload(file, 'body')
				.then(fileGuid => {
					// store off file id
					bodyData.fileGuid = fileGuid;
					// post for new empty body (return promise from this so that caller gets this promise for its "then")
					return webserviceCore.post('body/new')
				})
				.then(bodyGuidData => webservice.body.save({guid: bodyGuidData.guid, data: bodyData}).then(() => bodyGuidData))
				.then(bodyGuidData => webservice.body.all().then(() => bodyGuidData.guid))*/,
	},


	character: {
		all: () => console.log/*webserviceCore.get(`character/all/${store.getState().account.guid}`)
			.then(characters => {
				dispatchFieldChanged(undefined, 'characters', characters);
				return characters;
			})*/,

		create: character => console.log/*webserviceCore.post(`character/new/${store.getState().account.guid}`)
			.then(data => {
				character.guid = data.guid;
				return webservice.character.update(character).then(() => character);
			})
			.then(character => webservice.character.all().then(() => character))
			.then(character => character.guid)*/,

		update: character => console.log/*webserviceCore.post(`character/save/${character.guid}`, { data: JSON.stringify(character.data) })
			.then(result => webservice.character.all().then(() => result))*/,
	},

	file: {
		all: () =>console.log/* webserviceCore.get(`file/all/${store.getState().account.guid}`)
			.then(data => {
				dispatchFieldChanged(undefined, 'files', data);
				return data;
			})*/,

		upload: (file, fileType) => console.log/*{
			const formData = new FormData();
			formData.append("file", file);
			formData.append('fileType', fileType);
			return webserviceCore.post('file/upload', formData);
		}*/
	}
};

export default webservice;
