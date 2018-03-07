import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import MainPanel from "../Panels/MainPanel";
import TopNavigation from "../App/TopNavigation";

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
		const reader = new FileReader();
		const file = e.target.files[0];

		reader.onload = uploadE => {
			this.setState({previewFile: uploadE.target.result});
			// know body size, know image size? so then can know ratio of size to start with for this image
		};
		this.setState({file: e.target.files[0]});

		reader.readAsDataURL(file);
	}

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle="Admin - New Image"/>

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
				</MainPanel>

			</React.Fragment>
		);
	}
}

AdminImageNew.propTypes = {
};

