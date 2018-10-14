import React from "react";
import PropTypes from "prop-types";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import TopNavigation from "../../App/TopNavigation";
import BodyView from "../BodyView/BodyView";
import webservice from "../../Common/Webservice";
import routes from "../../Common/Routes";

const propTypes = {
	bodyGuid: PropTypes.string.isRequired,
	bodies: PropTypes.array.isRequired,
};
const defaultProps = {};

export default class AdminImageNewDEAD extends React.Component {

	uploadImage(e) {
		webservice.file.upload(e.target.files[0], 'article')
			.then(fileGuid => {
				const body = this.props.bodies.filter(body => body.guid === this.props.bodyGuid)[0];
				if (!body.data.images) {
					body.data.images = [];
				}
				body.data.images.push({fileGuid: fileGuid, zIndex: 100, freeFloat: false});
				return webservice.body.save(body).then(() => fileGuid);
			})
			.then(fileGuid => webservice.file.all().then(() => fileGuid))
			.then(fileGuid => webservice.body.all().then(() => fileGuid))
			.then(fileGuid => routes.admin.body.edit(this.props.bodyGuid, fileGuid));
	}

	render() {
		const body = this.props.bodies.length ? this.props.bodies.filter(body => body.guid === this.props.bodyGuid)[0] : undefined;

		return (
			<React.Fragment>
				<TopNavigation pageTitle="Admin - New Image"/>
				{body ?
					<React.Fragment>
						<LeftPanel>
							<input type="file" onChange={this.uploadImage.bind(this)} />
						</LeftPanel>
						<MainPanel>
							<BodyView bodyGuid={this.props.bodyGuid} images={[]}/>
						</MainPanel>
					</React.Fragment>
				: undefined }

			</React.Fragment>
		);
	}
}

AdminImageNewDEAD.propTypes = propTypes;
AdminImageNewDEAD.defaultProps = defaultProps;
