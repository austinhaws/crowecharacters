import React from "react";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import TopNavigation from "../../App/TopNavigation";
import Button from "dts-react-common/components/form/button/Button";
import routes from "../../Common/Routes";
import {InputInformation, SelectInput} from "dts-react-common";
import webservice from "../../Common/Webservice";
import {dispatchField, dispatchFieldCurry} from "../../App/Reducers";
import {dispatchDefaultState} from "../../App/Store";
import MainPanelBlurb from "../../Common/Components/Panels/MainPanelBlurb";

const propTypes = {
	globalData: PropTypes.object.isRequired,
	account: PropTypes.object,
	accountDolls: PropTypes.array,
};
const defaultProps = {
	account: undefined,
	accountDolls: undefined,
};
const mapStateToProps = state => {
	return {
		globalData: state.globalData,
		account: state.account,
		accountDolls: state.accountDolls,
	};
};

class Home extends React.Component {

	constructor(props) {
		super(props);

		this.deleteDoll = this.deleteDoll.bind(this);

		this.state = {
			createImageSetGuid: undefined,
		};

		webservice.imageSet.all();

		this.accountGuid = undefined;

		this.checkChangedDoll(props);
	}

	componentWillReceiveProps(props) {
		this.checkChangedDoll(props);
	}

	componentWillUnmount() {
		dispatchDefaultState('editDoll');
	}

	checkChangedDoll(props) {
		// has accountGuid but one is not specified
		if (!props.account && this.accountGuid) {
			this.accountGuid = undefined;
			dispatchField('accountDolls', undefined);

		// specified guid is not same as last guid
		} else if (props.account && props.account.guid !== this.accountGuid) {
			this.accountGuid = props.account.guid;
			dispatchField('accountDolls', undefined);
			webservice.doll.all(props.account.guid).then(dispatchFieldCurry('accountDolls'));
		}
	}

	deleteDoll(doll) {
		if (confirm(`Are you sure you want to delete '${doll.name || 'Unnamed'}'`)) {
			webservice.doll.delete(doll.guid);
			dispatchField('accountDolls', this.props.accountDolls.filter(accountDoll => accountDoll.guid !== doll.guid));
		}
	}

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle="Home"/>
				<LeftPanel>
					<div className="left-panel__top-buttons">
						{this.props.globalData.imageSets ? (
							<React.Fragment>
								<SelectInput
									field="imageSet"
									value={this.state.createImageSetGuid}
									options={this.props.globalData.imageSets.map(imageset => {return {value: imageset.guid, label: imageset.name };})}
									label="Image Sets"
									showLabel={false}
									size={InputInformation.SIZE.SMALL}
									onChange={(field, imageSetGuid) => this.setState({ createImageSetGuid: imageSetGuid })}
								/>
								<Button label="Create" onClick={() => routes.doll.new(this.state.createImageSetGuid)} disabled={!this.state.createImageSetGuid}/>
							</React.Fragment>
						) : undefined}
					</div>
					<div className="left-panel__list">
						{this.props.accountDolls ?
							this.props.accountDolls.map(doll => (
								<div
									key={doll.guid}
									className="left-panel__list__doll"
								>
									<div onClick={() => routes.doll.edit(doll.guid)}>{doll.name || '(Unnamed)'}</div>
									<Button
										onClick={() => this.deleteDoll(doll)}
										label="Delete"
										className="button--small"
									/>
								</div>)
							) : undefined}
					</div>
				</LeftPanel>
				<MainPanelBlurb>
					<p className="main-panel__blurb__text large title">Welcome to Crowe's Character Portrait Creator!</p>
					<ul className="main-panel__blurb__list">
						<li className="main-panel__blurb__text medium">Select a body type and click Create to start a new Character</li>
						<li className="main-panel__blurb__text medium">Click on an existing character to play around with what you've already created</li>
						<li className="main-panel__blurb__text medium">Make a note of your account name in the top right</li>
					</ul>
				</MainPanelBlurb>
			</React.Fragment>
		);
	}
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default connect(mapStateToProps)(Home);
