import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import constants from "../../Common/Constants";

const propTypes = {
	// the fileImages to display on the body
	fileImages: PropTypes.array.isRequired,
	// can override draw percent for the body (for printing)
	printPercent: PropTypes.number,
	// if !undefined then shows the given name above the body
	printName: PropTypes.string,
	// should the cutting outline be printed
	printCutBorder: PropTypes.bool,
};
const defaultProps = {
	printPercent: 100.0,
	printName: undefined,
	printCutBorder: false,
};

export default class BodyView extends React.Component {
	render() {

		// fit the images in the view size
		const containerHeight = 600;
		const containerWidth = 600;

		const firstImage = (this.props.fileImages && this.props.fileImages.length) ? this.props.fileImages[0] : { height: 0, width: 0 };

		const heightRatio = containerHeight / firstImage.height;
		const widthRatio = containerWidth / firstImage.width;

		const ratio = Math.min(heightRatio, widthRatio);

		const printRatio = this.props.printPercent / 100.0;

		const imageHeight = firstImage.height * ratio * printRatio;
		const imageWidth = firstImage.width * ratio * printRatio;

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
				{
					this.props.fileImages ?
					this.props.fileImages.map(image => (<img
							key={image.guid}
							className="body-image"
							src={`${constants.urlBase}images/${image.disk_name}`}
							style={_.assign({zIndex: image.z_index}, sizeStyleBodyImages)}
						/>))
					: undefined
				}

				{this.props.printCutBorder ? <img src="/img/PrintBorder.png" className="body-image" style={_.assign({zIndex: 1000}, sizeStyle, borderSizeStyle)}/>: undefined}

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
