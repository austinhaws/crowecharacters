import React from "react";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import TopNavigation from "../../App/TopNavigation";
import Button from "dts-react-common/components/form/button/Button";
import routes from "../../Common/Routes";
import {InputInformation, SelectInput} from "dts-react-common";
import webservice from "../../Common/Webservice";
import {dispatchField, dispatchFieldCurry} from "../../App/Reducers";

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

						list all other Dolls: {this.props.accountDolls && this.props.accountDolls.length}
					</div>
				</LeftPanel>
				<MainPanel>
					<div>Home Page</div>
					show news here
				</MainPanel>
			</React.Fragment>
		);
	}
}

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;

export default connect(mapStateToProps)(Home);
