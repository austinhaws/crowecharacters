import React from "react";
import Slider from 'react-rangeslider';
import PropTypes from "prop-types";
import {Button} from "dts-react-common";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import TopNavigation from "../../App/TopNavigation";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import ToggleButton from "../../Common/Components/ToggleButton/ToggleButton";
import PrintPaperWithDoll from "../PrintPaper/PrintPaperWithDoll";
import webservice from "../../Common/Webservice";
import {dispatchField, dispatchFieldCurry} from "../../App/Reducers";
import {dispatchDefaultState} from "../../App/Store";
import {connect} from "react-redux";
import routes from "../../Common/Routes";

const propTypes = {
	match: PropTypes.object.isRequired,
	account: PropTypes.object,

	// the print character view data
	printDoll: PropTypes.object.isRequired,
};
const defaultProps = {
	account: undefined,
};
const mapStateToProps = state => { return {
	printDoll: state.printDoll,
	account: state.account,
}};

class DollPrint extends React.Component {
	constructor(props) {
		super(props);

		this.checkChangedDoll = this.checkChangedDoll.bind(this);
		this.dispatchChange = this.dispatchChange.bind(this);

		this.checkChangedDoll(props);
	}

	componentWillReceiveProps(props) {
		this.checkChangedDoll(props);
	}

	componentWillUnmount() {
		dispatchDefaultState('printDoll');
	}

	checkChangedDoll(props) {
		if (!props.printDoll.doll || props.printDoll.doll.guid !== props.match.params.dollGuid) {
			webservice.doll.get(props.match.params.dollGuid)
				.then(doll => {
					dispatchField('printDoll.doll', doll);
					return webservice.imageSet.get(doll.image_set_guid);
				})
				.then(dispatchFieldCurry('printDoll.imageSet'));
		}
	}

	dispatchChange(field, value) {
		dispatchField('printDoll.doll', Object.assign({}, this.props.printDoll.doll, { [field]: value }));
	}

	saveChange(field, value) {
		webservice.doll.save(this.props.account.guid, Object.assign({}, this.props.printDoll.doll, { [field]: value }));
	}

	toggleChangeCurry(field) {
		return () => {
			const newValue = this.props.printDoll.doll[field] === 1 ? 0 : 1;
			this.dispatchChange(field, newValue);
			this.saveChange(field, newValue);
		};
	}

	render() {
		return this.props.printDoll.doll ? (
			<React.Fragment>
				<TopNavigation pageTitle={this.props.printDoll.doll ? `Print ${this.props.printDoll.doll.name}` : ''}/>

				<LeftPanel>
					<div className="image-row multi-row">
						<div>Print Percent:</div>
						<Slider
							value={this.props.printDoll.doll.print_percent || 50}
							min={20}
							max={100}
							step={1}
							onChange={value => this.dispatchChange('print_percent', value)}
							onChangeComplete={() => this.saveChange('print_percent', this.props.printDoll.doll.print_percent)}
						/>
					</div>
					<div className="image-row">
						<ToggleButton
							selected={this.props.printDoll.doll && this.props.printDoll.doll.print_name === 1}
							onToggle={this.toggleChangeCurry('print_name')}
						/>
						<div className="image-name">Show Name</div>
					</div>

					<div className="image-row">
						<ToggleButton
							selected={this.props.printDoll.doll ? !!this.props.printDoll.doll.print_cut_border : false}
							onToggle={this.toggleChangeCurry('print_cut_border')}
						/>
						<div className="image-name">Print cutting border</div>
					</div>
				</LeftPanel>

				<MainPanel>
					{this.props.printDoll.doll ? <PrintPaperWithDoll doll={this.props.printDoll.doll} imageSet={this.props.printDoll.imageSet}/> : undefined}
					<div className="bottom-buttons-container">
						<Button label="Cancel" className="cancel-button" onClick={routes.back}/>
						<Button label="Print" className="print-button" onClick={window.print}/>
					</div>
				</MainPanel>
			</React.Fragment>
		) : <div/>;
	}
}

DollPrint.propTypes = propTypes;
DollPrint.defaultProps = defaultProps;

export default connect(mapStateToProps)(DollPrint);
