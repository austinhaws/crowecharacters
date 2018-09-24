import store from "../App/Store";

export default {
		bodyByGuid: guid => guid ? store.getState().bodies.find(body => body.guid === guid) : undefined,
		fileByGuid: guid => guid ? store.getState().files.find(file => file.guid === guid) : undefined,
		filesForBodyImages: body => body ? body.data.images.map(image => store.getState().files.find(file => file.guid === image.fileGuid)) : undefined,
		characterByGuid: guid => guid ? store.getState().characters.find(character => character.guid === guid) : undefined,
};
