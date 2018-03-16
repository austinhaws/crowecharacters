import React from "react";
import PropTypes from "prop-types";

export default class PrintPaper extends React.Component {
	render() {
		return (
			<div className="print-paper">
				{this.props.children}
			</div>
		);
	}
}

PrintPaper.propTypes = {
	children: PropTypes.any,
};

