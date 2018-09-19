import store from "../App/Store";
import shared from "../App/Shared";

const webservice = {

	account: {
		load: callback => {
			// get current account guid from localstorage
			const accountGuid = localStorage.getItem('accountPhrase');

			// if not found, then create new account
			const accountCallback = account => {
				// store accountGuid in localstorage
				localStorage.setItem('accountPhrase', account.phrase);

				// dispatch set account information
				shared.functions.dispatchFieldChanged(undefined, 'account', account);

				// call callback
				callback(account);
			};

			if (accountGuid) {
				webservice.account.get(accountGuid, accountCallback);
			} else {
				webservice.account.new(accountCallback);
			}
		},
		new: callback => shared.functions.ajax('get', 'account/new', undefined, callback),
		get: (phrase, callback) => shared.functions.ajax('get', `account/get/${phrase}`, undefined, callback)
	},
	body: {
		all: callback => shared.functions.ajax('get', 'body/all', undefined, data => {
			shared.functions.dispatchFieldChanged(undefined, 'bodies', data);
			callback && callback();
		}),
		/**
		 * save a body
		 *
		 * @param body the full body record to save
		 * @param callback on finish, the result (success message)
		 */
		save: (body, callback) => shared.functions.ajax('post', `body/save/${body.guid}`, {data: JSON.stringify(body.data)}, callback),

		/**
		 * create a new body for the given image file with the given body information
		 *
		 * @param file the file to upload for this body
		 * @param bodyData body's data
		 * @param callback what to call when all done
		 */
		create: (file, bodyData, callback) =>
			webservice.file.upload(file, 'body', fileGuid => {
				bodyData.fileGuid = fileGuid;
				shared.functions.ajax('post', 'body/new', undefined, bodyGuidData => {
					webservice.body.save({guid: bodyGuidData.guid, data: bodyData}, () => {
						webservice.body.all(() => callback && callback(bodyGuidData.guid));
					});
				});
			})
	},

	character: {
		all: callback => shared.functions.ajax('get', `character/all/${store.getState().account.guid}`, undefined, characters => {
			shared.functions.dispatchFieldChanged(undefined, 'characters', characters);
			if (callback) {
				callback();
			}
		}),
		create: (character, callback) => shared.functions.ajax('post', `character/new/${store.getState().account.guid}`, undefined, data => {
			character.guid = data.guid;
			webservice.character.update(character, () => {
				webservice.character.all();
				callback(data.guid);
			});
		}),
		update: (character, callback) => shared.functions.ajax('post', `character/save/${character.guid}`, {data: JSON.stringify(character.data)}, result => webservice.character.all(() => callback ? callback(result) : undefined)),
	},

	file: {
		all: callback => shared.functions.ajax('get', 'file/all', undefined, data => {
			shared.functions.dispatchFieldChanged(undefined, 'files', data);
			if (callback) {
				callback();
			}
		}),

		/**
		 * upload a file and get its guid back
		 *
		 * @param file file content from the upload file button
		 * @param fileType what type of file it is (body, article)
		 * @param callback gets the new guid back as a parameter with which you can then add to a body or do whatever you want
		 */
		upload: (file, fileType, callback) => {
			const formData = new FormData();
			formData.append("file", file);
			formData.append('fileType', fileType);
			shared.functions.ajax('post', 'file/upload', formData, callback);
		}
	}
};

export default webservice;
