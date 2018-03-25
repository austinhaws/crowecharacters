import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import PropTypes from "prop-types";
import shared from "../App/Shared";
import TopNavigation from "../App/TopNavigation";
import clone from "clone";
import MainPanel from "../Panels/MainPanel";
import ToggleButton from "../Common/ToggleButton/ToggleButton";
import Button from "../Common/Button/Button";
import Slider from 'react-rangeslider';
import PrintPaperWithCharacter from "../PrintPaper/PrintPaperWithCharacter";

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

					<div className="image-row multi-row">
						<div>Print Percent:</div>
						<Slider
							value={this.props.printCharacter.character.data.printPercent || 50}
							min={20}
							max={100}
							step={1}
							onChange={value => this.dispatchSaveChange('printPercent', value)}
						/>
					</div>
					<div className="image-row">
						<ToggleButton selected={this.props.printCharacter.character ? this.props.printCharacter.character.data.printName : false} onToggle={() => this.dispatchSaveChange('printName', !this.props.printCharacter.character.data.printName)}/>
						<div className="image-name">Show Name</div>
					</div>

					<div className="image-row">
						<ToggleButton selected={this.props.printCharacter.character ? this.props.printCharacter.character.data.printCutBorder : false} onToggle={() => this.dispatchSaveChange('printCutBorder', !this.props.printCharacter.character.data.printCutBorder)}/>
						<div className="image-name">Print cutting border</div>
					</div>
				</LeftPanel>

				<MainPanel>
					{this.props.printCharacter.character ? <PrintPaperWithCharacter character={this.props.printCharacter.character}/> : undefined}
					<div className="bottom-buttons-container">
						<Button title="Cancel" className="cancel-button" onClick={() => this.props.history.goBack()}/>
						<Button title="Print" className="print-button" onClick={window.print}/>
					</div>
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

