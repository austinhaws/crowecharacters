import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import MainPanel from "../Panels/MainPanel";
import PropTypes from "prop-types";
import images from "../Common/Images";
import TopNavigation from "../App/TopNavigation";
import BodyView from "../BodyView/BodyView";
import webservice from "../Common/Webservice";
import {joinClassNames} from "dts-react-common";
import {dispatchFieldChanged} from "../App/Reducers";

const propTypes = {
	newCharacter: PropTypes.object.isRequired,
	bodies: PropTypes.array.isRequired,
	account: PropTypes.object,
	history: PropTypes.object,
};
const defaultProps = {};

export default class NewCharacter extends React.Component {
	saveCharacter() {
		webservice.character.create(this.props.newCharacter.editingCharacter).then(guid => {
			this.props.history.push(`/character/edit/${guid}`);
			dispatchFieldChanged('newCharacter', 'editingCharacter', {data: {name: '', bodyGuid: ''}});
		});
	}

	render() {
		const isSaveable = this.props.newCharacter.editingCharacter.data.name && this.props.newCharacter.editingCharacter.data.bodyGuid;
		return (
			<React.Fragment>
				<TopNavigation pageTitle="New Character"/>
				<LeftPanel>
					<input
						className="first-input data-entry"
						type="text"
						value={this.props.newCharacter.editingCharacter.data.name || ''}
						onChange={e => dispatchFieldChanged('newCharacter.editingCharacter.data', 'name', e.target.value)}
						placeholder="NAME"
					/>

					<hr/>

					<div className="input-search">
						<input
							className="search"
							type="text"
							value={this.props.newCharacter.searchText || ''}
							onChange={e => dispatchFieldChanged('newCharacter', 'searchText', e.target.value)}
						/>
						{images.magnifyingGlass()}
					</div>

					<div className="search-results">
						{this.props.bodies
							// filter by search text
							.filter(body => this.props.newCharacter.searchText ? body.data.name.toLowerCase().includes(this.props.newCharacter.searchText.toLowerCase()) : true)
							// show possible bodies
							.map(body => (
								<div
									key={`${body.data.name}${body.data.gender}`}
									className={joinClassNames(
										'search-result',
										body.guid === this.props.newCharacter.editingCharacter.data.bodyGuid ? 'selected' : undefined,
									)}
									onClick={() => dispatchFieldChanged('newCharacter.editingCharacter.data', 'bodyGuid', body.guid)}
								>
									<div className={`gender ${body.data.gender}`}>{images[body.data.gender]()}</div>
									<div className="name">{body.data.name}</div>
								</div>
							))}
					</div>

					<div className="bottom-buttons-container">
						<button className="cancel-action" onClick={() => this.props.history.push('/')}>Cancel</button>
						<button className="default-action" disabled={!isSaveable} onClick={this.saveCharacter.bind(this)}>Let's Go</button>
					</div>
				</LeftPanel>
				<MainPanel>
					{this.props.newCharacter.editingCharacter.data.bodyGuid ? <BodyView bodyGuid={this.props.newCharacter.editingCharacter.data.bodyGuid}/> : undefined}
				</MainPanel>
			</React.Fragment>
		);
	}
}

NewCharacter.propTypes = propTypes;
NewCharacter.defaultProps = defaultProps;

