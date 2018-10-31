import React from "react";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import TopNavigation from "../../App/TopNavigation";
import webservice from "../../Common/Webservice";
import routes from "../../Common/Routes";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Button} from "dts-react-common";

const propTypes = {
	globalData: PropTypes.object.isRequired,
};
const defaultProps = {};

class ImageSetList extends React.Component {
	constructor(props) {
		super(props);

		this.deleteImageSet = this.deleteImageSet.bind(this);
	}

	componentDidMount() {
		webservice.imageSet.all();
	}

	deleteImageSet(e, imageSet) {
		e.preventDefault();
		e.stopPropagation();
		if (confirm(`Are you sure you want to delete - '${imageSet.name}'?`)) {
			webservice.imageSet.delete(imageSet.guid)
				.then(() => webservice.imageSet.all());
		}
	}

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle="ImageSet - List" backUrl="/admin"/>
				<LeftPanel>
					<div className="left-panel__top-buttons">
						<Button label="New" onClick={routes.admin.imageSet.new}/>
					</div>
					<div className="image-set-list">{
						this.props.globalData.imageSets ? (
							<ul className="image-set-list__image-list">
								{this.props.globalData.imageSets.map(imageSet => (
									<li
										className="image-set-list__list__image-set"
										key={imageSet.guid}
										onClick={() => routes.admin.imageSet.edit(imageSet.guid)}
									>
										<div className="image-set-list__list__image-set__name">{imageSet.name}</div>
										<div className="image-set-list__list__image-set__button"><Button onClick={e => this.deleteImageSet(e, imageSet)} label="Delete" showLabel={false} className="button--small"/></div>
									</li>
								))}
							</ul>
						) : undefined
					}</div>
				</LeftPanel>
				<MainPanel>
					Show some information about what is an image set and a button to add a new set
				</MainPanel>
			</React.Fragment>
		);
	}
}

ImageSetList.propTypes = propTypes;
ImageSetList.defaultProps = defaultProps;

export default connect(state => { return { globalData: state.globalData }; })(ImageSetList);
