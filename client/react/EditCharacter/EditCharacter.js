import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import MainPanel from "../Panels/MainPanel";
import PropTypes from "prop-types";
import shared from "../App/Shared";
import CharacterBody from "../CharacterBody/CharacterBody";
import TopNavigation from "../App/TopNavigation";
import clone from "clone";

export default class EditCharacter extends React.Component {
	saveCharacter() {
		// shared.ajax.character.create(this.props.newCharacter.editingCharacter, guid => this.props.history.push(`/character/${guid}`));
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
					Hello world! {this.props.guid}
				</LeftPanel>
				<MainPanel>
					{this.props.editCharacter.character ? <CharacterBody character={this.props.editCharacter.character}/> : undefined}
				</MainPanel>
			</React.Fragment>
		);
	}
}

EditCharacter.propTypes = {
	// guid of the character to edit
	guid: PropTypes.string.isRequired,
};

