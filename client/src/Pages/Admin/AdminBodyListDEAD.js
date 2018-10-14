import React from "react";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import TopNavigation from "../../App/TopNavigation";
import ItemList from "../../Common/Components/ItemList/ItemList";
import * as PropTypes from "prop-types";

const propTypes = {
	bodies: PropTypes.array.isRequired,
};

const defaultProps = {};

export default class AdminBodyListDEAD extends React.Component {
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
						onSelectChange={body => routes.admin.body.edit(body.guid)}
						onRenderItem={body => body.data.name}
					/>

					<div className="bottom-buttons-container">
						<button className="midget minusButton" disabled={!this.state.selectedImage} onClick={() => console.log('remove this body')}>-</button>
						<button className="midget plusButton" onClick={() => routes.admin.body.new()}>+</button>
					</div>
				</LeftPanel>
			</React.Fragment>
		);
	}
}

AdminBodyListDEAD.propTypes = propTypes;
AdminBodyListDEAD.defaultProps = defaultProps;

