import React from "react";
import PropTypes from "prop-types";
import MainPanel from "./MainPanel";

const propTypes = {
	children: PropTypes.any,
};
const defaultProps = {};

export default class MainPanelBlurb extends React.Component {
	render() {
		return (
			<MainPanel>
				<div className="main-panel__blurb">
					{this.props.children}
				</div>
			</MainPanel>
		);
	}
}

MainPanelBlurb.propTypes = propTypes;
MainPanelBlurb.defaultProps = defaultProps;
