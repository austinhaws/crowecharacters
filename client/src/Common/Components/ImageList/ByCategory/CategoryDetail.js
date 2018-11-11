import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {Button} from "dts-react-common";
import {dispatchField} from "../../../../App/Reducers";


const propTypes = {
	category: PropTypes.object.isRequired,
	imagesInCategory: PropTypes.array.isRequired,
	selectedImageGuids: PropTypes.array.isRequired,
	categoryDetailTestImageGuid: PropTypes.string,

	// === events ===
	// called with image when image's add button is pressed
	onImageAdd: PropTypes.func.isRequired,
};
const defaultProps = {
	categoryDetailTestImageGuid: undefined,
};
const mapStateToProps = state => {
	return {
		imageCategories: state.globalData.imageCategories,
		categoryDetailTestImageGuid: state.categoryDetailTestImageGuid,
	};
};

class CategoryDetail extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			imageSliderIdx: 0,
		};

		this.onSliderChange = this.onSliderChange.bind(this);
		this.onAddImage = this.onAddImage.bind(this);
	}

	onSliderChange(newValue, availableImages) {
		if (newValue !== this.state.imageSliderIdx) {
			this.setState({ imageSliderIdx: newValue });
			dispatchField('categoryDetailTestImageGuid', newValue === 0 ? undefined : availableImages[newValue - 1].guid);
		}
	}

	onAddImage(testImage) {
		this.props.onImageAdd(testImage);
		dispatchField('categoryDetailTestImageGuid', undefined);
		this.setState({ imageSliderIdx: 0 });
	}

	render() {
		const availableImages = this.props.imagesInCategory.filter(image => !this.props.selectedImageGuids.includes(image.guid));
		const testImage = this.props.categoryDetailTestImageGuid && _.find(this.props.imagesInCategory, image => image.guid === this.props.categoryDetailTestImageGuid);
		return (
			<div>
				<div className="category-detail__image-slider__name">
					{testImage ? testImage.pretty_name : ''}
				</div>
				<div className="category-detail__image-slider__container">
					{availableImages.length ? (
						<div className="category-detail__image-slider__slider">
							<Slider
								min={0}
								max={availableImages.length}
								value={this.state.imageSliderIdx}
								tooltip={false}
								onChange={value => this.onSliderChange(value, availableImages)}
							/>
						</div>
					) : undefined}
					{testImage ? (
						<Button
							onClick={() => this.onAddImage(testImage)}
							label="Add"
							className="category-detail__image-slider__container__button"
						/>
						) : undefined}
				</div>
			</div>
		);
	}
}

CategoryDetail.propTypes = propTypes;
CategoryDetail.defaultProps = defaultProps;

export default connect(mapStateToProps)(CategoryDetail);
