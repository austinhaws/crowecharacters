import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import dataGetter from "../Common/DataGetter";
import constants from "../Common/Constants";

const propTypes = {
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
const defaultProps = {};

export default class BodyView extends React.Component {
	render() {

		const body = dataGetter.bodyByGuid(this.props.bodyGuid);
		const file = dataGetter.fileByGuid(body.data.fileGuid);

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

		// since printing is supposed to make characters look different sizes, then it would make sense to keep their names the same size to prove the contrast
		// this also helps center the name vertically better and give it better space
		const nameFont = 22;
		const nameHeight = nameFont;

		const sizeStyle = {
			width:`${imageWidth}px`,
			height:`${imageHeight}px`,
			left: `${imageMarginLeft}px`,
			top: 0,
		};
		const sizeStyleBodyImages = _.assign(sizeStyle, {top: nameHeight + 'px'});

		const borderSizeStyle = {
			height:`${imageHeight * 1.25}px`,
			top: 0,
		};

		return (
			<div className="body-container" style={{
				width:`${containerWidth}px`,
				height:`${containerHeight}px`,
			}}>
				<img
					className="body-template body-image"
					src={`${constants.urlBase}images/body/${file.data.name}`}
					style={_.assign({zIndex: body.data.zIndex}, sizeStyleBodyImages)}
				/>
				{
					this.props.fileImages ?
					this.props.fileImages.map(image => {
						const bodyImage = body.data.images.find(bodyImage => bodyImage.fileGuid === image.guid);
						return (<img
							key={image.guid}
							className="body-image"
							src={`${constants.urlBase}images/${image.data.fileType}/${image.data.name}`}
							style={_.assign({zIndex: bodyImage.zIndex}, sizeStyleBodyImages)}
						/>);
					})
					: undefined
				}

				{this.props.printCutBorder ? <img src="img/PrintBorder.png" className="body-image" style={_.assign({zIndex: 1000}, sizeStyle, borderSizeStyle)}/>: undefined}

				{this.props.printName ? (
					<div className="body-name" style={{fontSize: `${nameFont}px`}}>
						{this.props.printName}
					</div>
				) : undefined}
			</div>
		);
	}
}

BodyView.propTypes = propTypes;
BodyView.defaultProps = defaultProps;
