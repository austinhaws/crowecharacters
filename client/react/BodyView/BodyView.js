import React from "react";
import PropTypes from "prop-types";
import shared from "../App/Shared";
import _ from "lodash";

export default class BodyView extends React.Component {
	render() {

		const body = shared.functions.bodyByGuid(this.props.bodyGuid);
		const file = shared.functions.fileByGuid(body.data.fileGuid);

		// fit the image in the view size
		const containerHeight = 600;
		const containerWidth = 600;

		const heightRatio = containerHeight / file.data.height;
		const widthRatio = containerWidth / file.data.width;

		const ratio = Math.min(heightRatio, widthRatio);

		const imageHeight = file.data.height * ratio;
		const imageWidth = file.data.width * ratio;

		const imageMarginLeft = containerWidth / 2.0 - imageWidth / 2.0;

		const sizeStyle = {
			width:`${imageWidth}px`,
			height:`${imageHeight}px`,
			left: `${imageMarginLeft}px`,
			top: '0',
		};

		return (
			<div className="body-container" style={{
				width:`${containerWidth}px`,
				height:`${containerHeight}px`,
			}}>
				<img
					className="body-template body-image"
					src={`${shared.constants.urlBase}images/bodies/${file.data.name}`}
					style={_.assign({zIndex: body.data.zIndex}, sizeStyle)}
				/>
				{
					this.props.fileImages ?
					this.props.fileImages.map(image => {
						const bodyImage = body.data.images.find(bodyImage => bodyImage.fileGuid === image.guid);
						return (<img
							key={image.guid}
							className="body-image"
							src={`${shared.constants.urlBase}images/${image.data.fileType}/${image.data.name}`}
							style={_.assign({zIndex: bodyImage.zIndex}, sizeStyle)}
						/>);
					})
					: undefined
				}
			</div>
		);
	}
}

BodyView.propTypes = {
	// the character to display
	bodyGuid: PropTypes.string.isRequired,
	// the fileImages to display on the body
	fileImages: PropTypes.array,
};

