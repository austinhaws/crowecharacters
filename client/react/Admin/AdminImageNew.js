import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import MainPanel from "../Panels/MainPanel";
import TopNavigation from "../App/TopNavigation";
import PropTypes from "prop-types";
import BodyView from "../BodyView/BodyView";
import shared from "../App/Shared";

export default class AdminImageNew extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			file: undefined,
			previewFile: undefined,
			fileSizeWidth: 500,
			fileSizeHeight: 500,
		};
	}

	uploadImage(e) {
		shared.ajax.file.upload(e.target.files[0], 'article', fileGuid => {
			const body = this.props.bodies.filter(body => body.guid === this.props.bodyGuid)[0];
			if (!body.data.images) {
				body.data.images = [];
			}
			body.data.images.push({fileGuid: fileGuid, zIndex: 100, freeFloat: false});
				shared.ajax.body.save(body, () => shared.ajax.file.all(
					() => shared.ajax.body.all(() => this.props.history.push(`/admin/body/edit/${this.props.bodyGuid}/${fileGuid}`))
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
							{this.state.previewFile ?
								<img
									height={this.state.fileSizeHeight + 'px'}
									width={this.state.fileSizeWidth + 'px'}
									src={this.state.previewFile}/>
								: undefined}
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
