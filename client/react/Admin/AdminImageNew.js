import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import MainPanel from "../Panels/MainPanel";
import TopNavigation from "../App/TopNavigation";
import PropTypes from "prop-types";
import BodyView from "../BodyView/BodyView";
import webservice from "../Common/Webservice";

export default class AdminImageNew extends React.Component {

	uploadImage(e) {
		webservice.file.upload(e.target.files[0], 'article', fileGuid => {
			const body = this.props.bodies.filter(body => body.guid === this.props.bodyGuid)[0];
			if (!body.data.images) {
				body.data.images = [];
			}
			body.data.images.push({fileGuid: fileGuid, zIndex: 100, freeFloat: false});
			webservice.body.save(body, () => webservice.file.all(
					() => webservice.body.all(() => this.props.history.push(`/admin/body/edit/${this.props.bodyGuid}/${fileGuid}`))
			));
		});
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

AdminImageNew.propTypes = {
	bodyGuid: PropTypes.string.isRequired,
};
