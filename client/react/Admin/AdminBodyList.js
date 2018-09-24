import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import TopNavigation from "../App/TopNavigation";
import ItemList from "../Common/ItemList/ItemList";
import PropTypes from "prop-types";
import dataGetter from "../Common/DataGetter";

const propTypes = {
	bodies: PropTypes.array.isRequired,
	history: PropTypes.object.isRequired,
};

const defaultProps = {};

export default class AdminBodyList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedBodyGuid: undefined,
			search: '',
			selectedImage: undefined,
		};
	}
	render() {
		const body = dataGetter.bodyByGuid(this.state.selectedBodyGuid);
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
						<button className="midget plusButton" onClick={() => this.props.history.push('/admin/body/new')}>+</button>
					</div>

				</LeftPanel>

			</React.Fragment>
		);
	}
}

AdminBodyList.propTypes = propTypes;
AdminBodyList.defaultProps = defaultProps;

