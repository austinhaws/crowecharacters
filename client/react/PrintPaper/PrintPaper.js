import React from "react";
import PropTypes from "prop-types";

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

PrintPaper.propTypes = {
	children: PropTypes.any,
};

