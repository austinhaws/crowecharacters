import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import TopNavigation from "../App/TopNavigation";
import shared from "../App/Shared";
import ItemList from "../Common/ItemList/ItemList";
import PropTypes from "prop-types";

export default class AdminBodyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBodyGuid: undefined,
			search: '',
		};
	}
	render() {
		const body = shared.functions.bodyByGuid(this.state.selectedBodyGuid);
		return (
			<React.Fragment>
				<TopNavigation pageTitle="Admin - Bodies"/>

				<LeftPanel>
					<input type="text" value={this.state.search} onChange={e => this.setState({search: e.target.value})}/>
					<ItemList
						items={this.props.bodies} selectedItem={body}
						onSelectChange={body => this.props.history.push(`/admin/body/edit/${body.guid}`)}
						onRenderItem={body => body.data.name}
					/>

					<div className="bottom-buttons-container">
						<button className="midget minusButton" disabled={!this.state.selectedImage} onClick={() => console.log('remove this body')}>-</button>
						<button className="midget plusButton" disabled={!this.state.bodyGuid} onClick={() => console.log('add new body')}>+</button>
					</div>

				</LeftPanel>

			</React.Fragment>
		);
	}
}

AdminBodyList.propTypes = {
	bodies: PropTypes.array.isRequired,
};

