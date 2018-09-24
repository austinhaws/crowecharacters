import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import TopNavigation from "../App/TopNavigation";
import PropTypes from "prop-types";
import webservice from "../Common/Webservice";
import AdminBodyList from "./AdminBodyList";

const propTypes = {
	history: PropTypes.object.isRequired,
};
const defaultProps = {};

export default class AdminBodyNew extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			bodyData: {
				fileGuid: undefined,
				version: 1,
				name: '',
				gender: 'female',
				zIndex: 100,
				images: [],
				defaultHeight: 4.0,
			},
			files: undefined,
		};

		this.uploadBody = this.uploadBody.bind(this);
	}

	uploadBody() {
		if (!this.state.bodyData.name || !this.state.files) {
			alert('Pick a file and enter a name before saving');
		} else {
			// upload the body file to get its file guid
			webservice.body.create(this.state.files[0], this.state.bodyData)
				.then(bodyGuid => webservice.body.all()
					.then(() => bodyGuid))
				// get all files and go to editing the body
				.then(bodyGuid => webservice.file.all()
					.then(() => this.props.history.push(`/admin/body/edit/${bodyGuid}`)));

		}
	}

	changeBodyData(field, e) {
		this.setState({bodyData: Object.assign({}, this.state.bodyData, {[field]: e.target.value})});
	}

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle="Admin - New Body"/>
				<LeftPanel>
					<input type="text" placeholder="Name" value={this.state.bodyData.name} onChange={e => this.changeBodyData('name', e)}/>
					<select onChange={e => this.changeBodyData('gender', e)} value={this.state.bodyData.gender}>
						<option value="female">Female</option>
						<option value="male">Male</option>
					</select>

					<input type="file" onChange={e => this.setState({files: e.target.files})}/>

					<div className="bottom-buttons-container">
						<button className="cancelAction" onClick={this.props.history.goBack}>Cancel</button>
						<button className="defaultAction" onClick={this.uploadBody}>Save</button>
					</div>
				</LeftPanel>
			</React.Fragment>
		);
	}
}

AdminBodyList.propTypes = propTypes;
AdminBodyList.defaultProps = defaultProps;
