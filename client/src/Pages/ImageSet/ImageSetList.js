import React from "react";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import TopNavigation from "../../App/TopNavigation";
import webservice from "../../Common/Webservice";
import routes from "../../Common/Routes";
import {dispatchFieldChanged} from "../../App/Reducers";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {Button} from "dts-react-common";

const propTypes = {
	globalData: PropTypes.object.isRequired,
};
const defaultProps = {};

class ImageSetList extends React.Component {
	componentDidMount() {
		webservice.imageSet.all().then(imageSets => dispatchFieldChanged('globalData', 'imageSets', imageSets));
	}

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle="ImageSet - List" backUrl="/admin"/>
				<LeftPanel>
					<div>
						<Button label="New" onClick={routes.admin.imageSet.new}/>
					</div>
					<div>{
						this.props.globalData.imageSets ? (
							<ul className="image-set-list__image-list">
								{this.props.globalData.imageSets.map(imageSet => (
									<li
										key={imageSet.guid}
										onClick={() => routes.admin.imageSet.edit(imageSet.guid)}
									>
										{imageSet.name}
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
