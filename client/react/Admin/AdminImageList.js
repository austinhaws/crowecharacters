import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import TopNavigation from "../App/TopNavigation";
import ImageList from "../Common/ImageList/ImageList";
import shared from "../App/Shared";

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
		const body = shared.functions.bodyByGuid(this.state.bodyGuid);
		const imageFiles = shared.functions.filesForBodyImages(body);
		return (
			<React.Fragment>
				<TopNavigation pageTitle="Admin - Images"/>

				<LeftPanel>
					<select value={this.state.bodyGuid} onChange={e => this.setState({bodyGuid: e.target.value})}>
						<option key="noSelection" value="">Pick a body...</option>
						{this.props.bodies.map(body => <option key={body.guid} value={body.guid}>{body.data.name}</option>)}
					</select>
					<input type="text" value={this.state.search} onChange={e => this.setState({search: e.target.value})}/>

					{body ? <ImageList imageFiles={imageFiles} selectedChanged={e => console.log(e)}/> : undefined}
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

