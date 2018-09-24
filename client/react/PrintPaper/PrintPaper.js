import React from "react";
import PropTypes from "prop-types";

const propTypes = {
	children: PropTypes.any,
};
const defaultProps = {};

export default class PrintPaper extends React.Component {
	render() {
		return (
			<div className="print-paper print">
				<div className="print-paper-size no-print">8.5 X 11</div>
				{this.props.children}
			</div>
		);
	}
}

PrintPaper.propTypes = propTypes;
PrintPaper.defaultProps = defaultProps;
