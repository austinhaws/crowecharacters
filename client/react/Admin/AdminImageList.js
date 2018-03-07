import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import shared from "../App/Shared";
import TopNavigation from "../App/TopNavigation";

export default class AdminImageList extends React.Component {
	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle="Admin - Images"/>

				<LeftPanel>
					<select value={this.props.admin.filters.bodyType} onChange={e => shared.functions.dispatchFieldChanged('admin.filters', 'bodyType', e.target.value)}>
						<option key="noSelection" value="">Pick a body...</option>
						{this.props.bodies.map(body => <option key={body.guid} value={body.guid}>{body.data.name}</option>)}
					</select>
					<input type="text" value={this.props.admin.filters.search} onChange={e => shared.functions.dispatchFieldChanged('admin.filters', 'search', e.target.value)}/>

					<div className="bottom-buttons-container">
						<button className="midget minusButton" disabled={!this.props.admin.selectedImage} onClick={() => console.log('minus button')}>-</button>
						<button className="midget plusButton" onClick={() => this.props.history.push('/admin/image/new')}>+</button>
					</div>

				</LeftPanel>

			</React.Fragment>
		);
	}
}

AdminImageList.propTypes = {
};

