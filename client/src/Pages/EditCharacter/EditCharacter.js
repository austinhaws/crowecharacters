import React from "react";
import PropTypes from "prop-types";
import clone from "clone";
import {dispatchFieldChanged} from "../../App/Reducers";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import TopNavigation from "../../App/TopNavigation";
import BodyView from "../BodyView/BodyView";
import ImageList from "../../Common/Components/ImageList/ImageList";
import webservice from "../../Common/Webservice";
import dataGetter from "../../Common/DataGetter";
import routes from "../../Common/Routes";
import {Button} from "dts-react-common";

const propTypes = {
	// guid of the character to edit
	guid: PropTypes.string.isRequired,

	// files from redux state
	files: PropTypes.array.isRequired,

	editCharacter: PropTypes.object.isRequired,
};
const defaultProps = {};

export default class EditCharacter extends React.Component {
	componentDidMount() {
		if (!this.props.editCharacter.character || this.props.editCharacter.character.guid !== this.props.guid) {
			const character = this.props.characters.filter(c => c.guid === this.props.guid)[0];
			dispatchFieldChanged('editCharacter', 'character', clone(character));
		}
	}

	changeSelectedImages(selectedImages) {
		// update redux
		dispatchFieldChanged('editCharacter.character.data', 'images', clone(selectedImages));

		// ajax save
		const saveCharacter = clone(this.props.editCharacter.character);
		saveCharacter.data.images = clone(selectedImages);
		webservice.character.update(saveCharacter);
	}

	render() {
		const body = this.props.editCharacter.character ? dataGetter.bodyByGuid(this.props.editCharacter.character.data.bodyGuid) : undefined;
		return this.props.editCharacter.character ? (
			<React.Fragment>
				<TopNavigation pageTitle={this.props.editCharacter.character ? this.props.editCharacter.character.data.name : ''} backUrl="/"/>

				<LeftPanel>

					<select value={this.props.editCharacter.filters.groupBy} onChange={e => dispatchFieldChanged('editCharacter.filters', 'groupBy', e.target.value)}>
						<option value="bodyPart">By Body Part</option>
						<option value="gearSet">By Gear Sets</option>
					</select>
					<input type="text" value={this.props.editCharacter.filters.search} onChange={e => dispatchFieldChanged('editCharacter.filters', 'search', e.target.value)}/>

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
								fileImages={this.props.editCharacter.character.data.images ? this.props.editCharacter.character.data.images.map(dataGetter.fileByGuid) : undefined}
								{ ...this.props }
							/>
							<div className="bottom-buttons-container body-bottom">
								<Button title="Print" className="print-button" onClick={() => routes.character.print(this.props.editCharacter.character.guid)}/>
							</div>
						</React.Fragment>
						: undefined}
				</MainPanel>

			</React.Fragment>
		) : <div/>;
	}
}

EditCharacter.propTypes = propTypes;
EditCharacter.defaultProps = defaultProps;
