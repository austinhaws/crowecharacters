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

		const printRatio = (this.props.printPercent || 100.0) / 100.0;

		const imageHeight = file.data.height * ratio * printRatio;
		const imageWidth = file.data.width * ratio * printRatio;

		const imageMarginLeft = containerWidth / 2.0 - imageWidth / 2.0;

		const MAX_FONT = 22;
		const MIN_FONT = 6;
		const FONT_RANGE = MAX_FONT - MIN_FONT;
		const nameFont = MAX_FONT - (FONT_RANGE * (1 - printRatio));

		const sizeStyle = {
			width:`${imageWidth}px`,
			height:`${imageHeight}px`,
			left: `${imageMarginLeft}px`,
			top: 0,
		};

		const borderSizeStyle = {
			height:`${imageHeight * 1.25}px`,
		};

		return (
			<div className="body-container" style={{
				width:`${containerWidth}px`,
				height:`${containerHeight}px`,
			}}>
				<img
					className="body-template body-image"
					src={`${shared.constants.urlBase}images/body/${file.data.name}`}
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

				{this.props.printCutBorder ? <img src="img/PrintBorder.png" className="body-image" style={_.assign({zIndex: 1000}, sizeStyle, borderSizeStyle)}/>: undefined}

				{this.props.printName ? (
					<div className="body-name" style={{fontSize: `${nameFont}px`, paddingTop:`${nameFont / 2}px`}}>
						{this.props.printName}
					</div>
				) : undefined}
			</div>
		);
	}
}

BodyView.propTypes = {
	// the character to display
	bodyGuid: PropTypes.string.isRequired,
	// the fileImages to display on the body
	fileImages: PropTypes.array,
	// can override draw percent for the body (for printing)
	printPercent: PropTypes.number,
	// if !undefined then shows the given name above the body
	printName: PropTypes.string,
	// should the cutting outline be printed
	printCutBorder: PropTypes.bool,
};

