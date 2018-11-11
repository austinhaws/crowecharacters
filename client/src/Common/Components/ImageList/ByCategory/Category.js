import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import _ from "lodash";
import {Button, joinClassNames} from "dts-react-common";
import CategoryDetail from "./CategoryDetail";

const propTypes = {
	categoryGuid: PropTypes.string.isRequired,
	imagesInCategory: PropTypes.array.isRequired,
	selectedImageGuids: PropTypes.array.isRequired,
	isSelected: PropTypes.bool.isRequired,

	// form store
	imageCategories: PropTypes.array,

	// === events ===
	// category was selected: category => { }
	onCategorySelect: PropTypes.func.isRequired,
	onImageAdd: PropTypes.func.isRequired,
	onImageRemove: PropTypes.func.isRequired,
};

const defaultProps = {
	imageCategories: undefined,
};

class Category extends React.Component {
	render() {
		const category = _.find(this.props.imageCategories, category => category.guid === this.props.categoryGuid);
		const shownImages = this.props.imagesInCategory.filter(image => this.props.selectedImageGuids.includes(image.guid));
		return (
			<div
				className={joinClassNames('category', this.props.isSelected && 'selected')}
			>
				{category ? <img src={`/img/categories/${category.image_file}`} title={category.name} onClick={() => this.props.onCategorySelect(category)}/> : undefined}
				{this.props.isSelected ?
					<React.Fragment>
						<CategoryDetail
							category={category}
							selectedImageGuids={this.props.selectedImageGuids}
							imagesInCategory={this.props.imagesInCategory}
							onImageAdd={this.props.onImageAdd}
						/>
						<div className="category__selected-images">
							{
								shownImages
									.map(image => (
										<div className="category__selected-images__image" key={image.guid}>
											<div key={image.guid}>{image.pretty_name}</div>
											<Button label="delete" onClick={() => this.props.onImageRemove(image)}/>
										</div>
									))
							}
						</div>
					</React.Fragment>
					: undefined}
			</div>
		);
	}
}

Category.propTypes = propTypes;
Category.defaultProps = defaultProps;

export default connect(state => {
	return {
		imageCategories: state.globalData.imageCategories,
	};
})(Category);
