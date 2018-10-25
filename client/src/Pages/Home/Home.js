import React from "react";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import TopNavigation from "../../App/TopNavigation";

const propTypes = {
	globalData: PropTypes.object.isRequired,
};
const defaultProps = {};

class Home extends React.Component {
	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle="Home"/>
				<LeftPanel>
					<div/>
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
