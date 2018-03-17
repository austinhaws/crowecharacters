import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import PropTypes from "prop-types";
import shared from "../App/Shared";
import TopNavigation from "../App/TopNavigation";
import clone from "clone";
import BodyView from "../BodyView/BodyView";
import PrintPaper from "../PrintPaper/PrintPaper";
import MainPanel from "../Panels/MainPanel";
import ToggleButton from "../Common/ToggleButton/ToggleButton";

export default class PrintCharacter extends React.Component {
	componentDidMount() {
		if (!this.props.printCharacter.character || this.props.printCharacter.character.guid !== this.props.guid) {
			const character = clone(this.props.characters.find(c => c.guid === this.props.guid));
			character.data.printPercent = character.data.printPercent || 50;
			character.data.printName = character.data.printName || false;
			character.data.printCutBorder = character.data.printCutBorder || false;
			shared.functions.dispatchFieldChanged('printCharacter', 'character', character);
		}
	}

	dispatchSaveChange(field, value) {
		shared.functions.dispatchFieldChanged('printCharacter.character.data', field, value);
		const character = clone(this.props.printCharacter.character);
		character.data[field] = value;
		shared.ajax.character.update(character);
	}

	render() {
		return this.props.printCharacter.character ? (
			<React.Fragment>
				<TopNavigation pageTitle={this.props.printCharacter.character ? `Print ${this.props.printCharacter.character.data.name}` : ''} backUrl="/" history={this.props.history}/>

				<LeftPanel>

					<input
						className="first-input data-entry"
						type="text"
						value={this.props.printCharacter.character.data.printPercent || ''}
						onChange={e => this.dispatchSaveChange('printPercent', e.target.value)}
						placeholder="PRINT PERCENT"
					/>
					<ToggleButton selected={this.props.printCharacter.character ? this.props.printCharacter.character.data.printName : false} onToggle={() => this.dispatchSaveChange('printName', !this.props.printCharacter.character.data.printName)}/>Show Name<br/>
					<ToggleButton selected={this.props.printCharacter.character ? this.props.printCharacter.character.data.printCutBorder : false} onToggle={() => this.dispatchSaveChange('printCutBorder', !this.props.printCharacter.character.data.printCutBorder)}/>Print cutting border<br/>
					cancel button to leave print page<br/>
					print button
				</LeftPanel>

				<MainPanel>
					{this.props.printCharacter.character ?
						<PrintPaper>
							<BodyView
								bodyGuid={this.props.printCharacter.character.data.bodyGuid}
								fileImages={this.props.printCharacter.character.data.images ? this.props.printCharacter.character.data.images.map(shared.functions.fileByGuid) : undefined}
								printPercent={this.props.printCharacter.character ? parseFloat(this.props.printCharacter.character.data.printPercent) : undefined}
								printName={this.props.printCharacter.character.data.printName ? this.props.printCharacter.character.data.name : undefined}
								printCutBorder={this.props.printCharacter.character.data.printCutBorder}
							/>
						</PrintPaper>
						: undefined}
				</MainPanel>

			</React.Fragment>
		) : <div/>;
	}
}

PrintCharacter.propTypes = {
	// guid of the character to edit
	guid: PropTypes.string.isRequired,

	// the print character view data
	printCharacter: PropTypes.object.isRequired,

	// files from redux state
	files: PropTypes.array.isRequired,

	// comes from React Router for routing history
	history: PropTypes.object.isRequired,
};

