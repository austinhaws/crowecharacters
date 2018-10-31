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

const propTypes = {
	globalData: PropTypes.object.isRequired,
};
const defaultProps = {};

class Home extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			createImageSetGuid: undefined,
		};

		webservice.imageSet.all();
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

						list all other Dolls
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

export default connect(state => {
	return {globalData: state.globalData};
})(Home);
