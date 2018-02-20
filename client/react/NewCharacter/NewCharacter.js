import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import MainPanel from "../Panels/MainPanel";
import PropTypes from "prop-types";
import shared from "../App/Shared";
import CharacterBody from "../CharacterBody/CharacterBody";

export default class NewCharacter extends React.Component {
	render() {
		return (
			<React.Fragment>
				<LeftPanel>
					<input
						className="first-input data-entry"
						type="text"
						value={this.props.newCharacter.editingCharacter.data.name || ''}
						onChange={e => shared.functions.dispatchFieldChanged('newCharacter.editingCharacter.data', 'name', e.target.value)}
						placeholder="NAME"
					/>

					<hr/>

					<div className="input-search">
						<input
							className="search"
							type="text"
							value={this.props.newCharacter.searchText || ''}
							onChange={e => shared.functions.dispatchFieldChanged('newCharacter', 'searchText', e.target.value)}
						/>
						{shared.images.magnifyingGlass()}
					</div>

					<div className="search-results">
						{this.props.bodies
							// filter by search text
							.filter(body => this.props.newCharacter.searchText ? body.data.name.toLowerCase().includes(this.props.newCharacter.searchText.toLowerCase()) : true)
							// show possible bodies
							.map(body =>
								<div
									key={`${body.data.name}${body.data.gender}`}
									className={shared.functions.joinClasses([
										'search-result',
										body.guid === this.props.newCharacter.editingCharacter.data.bodyGuid ? 'selected' : undefined,
									])}
									onClick={() => shared.functions.dispatchFieldChanged('newCharacter.editingCharacter.data', 'bodyGuid', body.guid)}
								>
									<div className={`gender ${body.data.gender}`}>{shared.images[body.data.gender]()}</div>
									<div className="name">{body.data.name}</div>
								</div>
							)}
					</div>

				</LeftPanel>
				<MainPanel>
					{this.props.newCharacter.editingCharacter.data.bodyGuid ? <CharacterBody character={this.props.newCharacter.editingCharacter}/> : undefined}
				</MainPanel>
			</React.Fragment>
		);
	}
}

NewCharacter.propTypes = {
	newCharacter: PropTypes.object.isRequired,
	bodies: PropTypes.array.isRequired,
};

