import React from "react";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import TopNavigation from "../../App/TopNavigation";
import webservice from "../../Common/Webservice";
import {dispatchFieldChanged} from "../../App/Reducers";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const propTypes = {
	globalData: PropTypes.object.isRequired,
	match: PropTypes.object,
};
const defaultProps = {
	match: undefined,
};

class ImageSetEdit extends React.Component {
	componentDidMount() {
		if (this.props.match) {
			webservice.imageSet.get(this.props.match.params.guid)
				.then(imageSet => dispatchFieldChanged(undefined, 'imageSetEdit', imageSet));
		} else {
			dispatchFieldChanged(undefined, 'imageSetEdit', {
				name: undefined,
				guid: undefined,
			});
		}
	}

	render() {
		console.log(this.props);
		return (
			<React.Fragment>
				<TopNavigation pageTitle={`ImageSet - ${this.props.imageSetEdit ? this.props.imageSetEdit.name : ''}`} backUrl="/admin"/>
				<LeftPanel>
					show list of images - drag and drop files on to list to add images super (use image list?)
					delete images
					reorder z-index of images (going to be much easier with drag and drop ordering)
					toggle on/off (checkbox is ok since clicking starts a drag and want to do drag and drop ordering)

					z-index allows ordering images to show which ones sit on top of the other

					on image line also show category menu
					save changes as they are made
				</LeftPanel>
				<MainPanel>
					show the image set images stacked in to the shown image
				</MainPanel>
			</React.Fragment>
		);
	}
}

ImageSetEdit.propTypes = propTypes;
ImageSetEdit.defaultProps = defaultProps;

export default connect(state => { return {
	imageSetEdit: state.imageSetEdit,
	globalData: state.globalData,
}; })(ImageSetEdit);
