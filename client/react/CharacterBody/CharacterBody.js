import React from "react";
import PropTypes from "prop-types";
import shared from "../App/Shared";

export default class CharacterBody extends React.Component {
	render() {

		const body = shared.functions.bodyByGuid(this.props.character.data.bodyGuid);
		const file = shared.functions.fileByGuid(body.data.fileGuid);

		const containerHeight = 600;
		const containerWidth = 600;

		const heightRatio = containerHeight / file.data.height;
		const widthRatio = containerWidth / file.data.width;

		const ratio = Math.min(heightRatio, widthRatio);

		const imageHeight = file.data.height * ratio;
		const imageWidth = file.data.width * ratio;

		const imageMarginLeft = containerWidth / 2.0 - imageWidth / 2.0;

		return (
			<div className="body-container" style={{width:`${containerWidth}px`,height:`${containerHeight}px`}}>
				<img
					className="body-template"
					src={`${shared.constants.urlBase}images/bodies/${file.data.name}`}
					style={{
						width:`${imageWidth}px`,
						height:`${imageHeight}px`,
						marginLeft: `${imageMarginLeft}px`,
					}}
				/>
			</div>
		);
	}
}

CharacterBody.propTypes = {
	// the character to display
	character: PropTypes.object.isRequired,
};

