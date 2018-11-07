import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Slider from 'react-rangeslider';
import 'react-rangeslider/lib/index.css';
import {Button} from "dts-react-common";


const propTypes = {
	category: PropTypes.object.isRequired,
	imagesInCategory: PropTypes.array.isRequired,
	selectedImageGuids: PropTypes.array.isRequired,

	// === events ===
	// called with image when image's add button is pressed
	onImageAdd: PropTypes.func.isRequired,
	// image selected to preview on the slider before it's added
	onImageTest: PropTypes.func.isRequired,
};
const defaultProps = {};

class CategoryDetail extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			testImageIdx: 0,
		};
	}

	render() {
		const availableImages = this.props.imagesInCategory.filter(image => !this.props.selectedImageGuids.includes(image.guid));
		return (
			<div>
				<div className="category-detail__image-slider__name">
					{this.state.testImageIdx === 0 ? ' ' : availableImages[this.state.testImageIdx - 1].pretty_name}
				</div>
				<div className="category-detail__image-slider__container">
					<div className="category-detail__image-slider__slider">
						<Slider
							min={0}
							max={availableImages.length}
							value={this.state.testImageIdx}
							tooltip={false}
							onChange={value => {
								this.setState({ testImageIdx: value });
								this.props.onImageTest(value === 0 ? undefined : availableImages[value - 1]);
							}}
						/>
					</div>
					{this.state.testImageIdx ? (
						<Button
							onClick={() => this.props.onImageAdd(availableImages[this.state.testImageIdx - 1])}
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

export default connect(state => {
	return {
		imageCategories: state.globalData.imageCategories,
	};
})(CategoryDetail);
