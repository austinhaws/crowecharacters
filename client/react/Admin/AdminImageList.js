import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import TopNavigation from "../App/TopNavigation";

export default class AdminImageList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bodyGuid: undefined,
			search: '',
			selectedImage: undefined,
		};
	}
	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle="Admin - Images"/>

				<LeftPanel>
					<select value={this.state.bodyGuid} onChange={e => this.setState({bodyGuid: e.target.value})}>
						<option key="noSelection" value="">Pick a body...</option>
						{this.props.bodies.map(body => <option key={body.guid} value={body.guid}>{body.data.name}</option>)}
					</select>
					<input type="text" value={this.state.search} onChange={e => this.setState({search: e.target.value})}/>

					<div className="bottom-buttons-container">
						<button className="midget minusButton" disabled={!this.state.selectedImage} onClick={() => console.log('minus button')}>-</button>
						<button className="midget plusButton" disabled={!this.state.bodyGuid} onClick={() => this.props.history.push(`/admin/image/new/${this.state.bodyGuid}`)}>+</button>
					</div>

				</LeftPanel>

			</React.Fragment>
		);
	}
}

AdminImageList.propTypes = {
};

