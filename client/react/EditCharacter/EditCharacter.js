import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import MainPanel from "../Panels/MainPanel";
import PropTypes from "prop-types";
import shared from "../App/Shared";
import TopNavigation from "../App/TopNavigation";
import clone from "clone";
import BodyView from "../BodyView/BodyView";
import ImageList from "../Common/ImageList/ImageList";
import Button from "../Common/Button/Button";
import webservice from "../Common/Webservice";

export default class EditCharacter extends React.Component {
	saveCharacter() {
		// shared.ajax.character.create(this.props.newCharacter.editCharacter, guid => this.props.history.push(`/character/${guid}`));
	}

	componentDidMount() {
		if (!this.props.editCharacter.character || this.props.editCharacter.character.guid !== this.props.guid) {
			const character = this.props.characters.filter(c => c.guid === this.props.guid)[0];
			shared.functions.dispatchFieldChanged('editCharacter', 'character', clone(character));
		}
	}

	changeSelectedImages(selectedImages) {
		// update redux
		shared.functions.dispatchFieldChanged('editCharacter.character.data', 'images', clone(selectedImages));

		// ajax save
		const saveCharacter = clone(this.props.editCharacter.character);
		saveCharacter.data.images = clone(selectedImages);
		webservice.character.update(saveCharacter)
	}

	render() {
		const body = this.props.editCharacter.character ? shared.functions.bodyByGuid(this.props.editCharacter.character.data.bodyGuid) : undefined;
		return this.props.editCharacter.character ? (
			<React.Fragment>
				<TopNavigation pageTitle={this.props.editCharacter.character ? this.props.editCharacter.character.data.name : ''} backUrl="/" history={this.props.history}/>

				<LeftPanel>

					<select value={this.props.editCharacter.filters.groupBy} onChange={e => shared.functions.dispatchFieldChanged('editCharacter.filters', 'groupBy', e.target.value)}>
						<option value="bodyPart">By Body Part</option>
						<option value="gearSet">By Gear Sets</option>
					</select>
					<input type="text" value={this.props.editCharacter.filters.search} onChange={e => shared.functions.dispatchFieldChanged('editCharacter.filters', 'search', e.target.value)}/>

					<ImageList
						imageFiles={body.data.images.map(image => this.props.files.find(file => file.guid === image.fileGuid))}
						selectedChanged={this.changeSelectedImages.bind(this)}
						selectedImages={this.props.editCharacter.character.data.images || []}
					/>
				</LeftPanel>

				<MainPanel>
					{this.props.editCharacter.character ?
						<React.Fragment>
							<BodyView
								bodyGuid={this.props.editCharacter.character.data.bodyGuid}
								fileImages={this.props.editCharacter.character.data.images ? this.props.editCharacter.character.data.images.map(shared.functions.fileByGuid) : undefined}
							/>
							<div className="bottom-buttons-container body-bottom">
								<Button title="Print" className="print-button" onClick={() => this.props.history.push(`/character/print/${this.props.editCharacter.character.guid}`)}/>
							</div>
						</React.Fragment>
						: undefined}
				</MainPanel>

			</React.Fragment>
		) : <div/>;
	}
}

EditCharacter.propTypes = {
	// guid of the character to edit
	guid: PropTypes.string.isRequired,

	// files from redux state
	files: PropTypes.array.isRequired,

	// comes from React Router for routing history
	history: PropTypes.object.isRequired,
};

