import React from "react";
import PropTypes from "prop-types";

export default class Slider extends React.Component {
	render() {
		return (
			<div className="slider-container">
				<div className="slider-line"/>
				{/*this needs drag and drop, so not going to implement right now*/}
				<div className="slider-pointer"/>
			</div>
		);
	}
}

Slider.propTypes = {
	percent: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
};

