import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import MainPanel from "../Panels/MainPanel";
import PropTypes from "prop-types";
import shared from "../App/Shared";
import TopNavigation from "../App/TopNavigation";
import clone from "clone";
import BodyView from "../BodyView/BodyView";

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

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle={this.props.editCharacter.character ? this.props.editCharacter.character.data.name : ''} backUrl="/" history={this.props.history}/>
				<LeftPanel>

						<select value={this.props.editCharacter.filters.groupBy} onChange={e => shared.functions.dispatchFieldChanged('editCharacter.filters', 'groupBy', e.target.value)}>
						<option value="bodyPart">By Body Part</option>
						<option value="gearSet">By Gear Sets</option>
					</select>
					<input type="text" value={this.props.editCharacter.filters.search} onChange={e => shared.functions.dispatchFieldChanged('editCharacter.filters', 'search', e.target.value)}/>

				</LeftPanel>
				<MainPanel>
					{this.props.editCharacter.character ? <BodyView bodyGuid={this.props.editCharacter.character.data.bodyGuid}/> : undefined}
				</MainPanel>
			</React.Fragment>
		);
	}
}

EditCharacter.propTypes = {
	// guid of the character to edit
	guid: PropTypes.string.isRequired,
	// the images to put on the body
	images: PropTypes.array.isRequired,
};
