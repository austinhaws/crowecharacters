import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import MainPanel from "../Panels/MainPanel";
import PropTypes from "prop-types";
import SearchInput from "../Common/SearchInput";
import TopNavigation from "../App/TopNavigation";
import BodyView from "../BodyView/BodyView";

const propTypes = {
	characters: PropTypes.array.isRequired,
	selectCharacter: PropTypes.object.isRequired,
	history: PropTypes.object.isRequired,
};
const defaultProps = {};


export default class CharacterSelector extends React.Component {

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle="Select a Character"/>
				<LeftPanel>
					<div className="first-input input-search">
						<SearchInput objectPath="selectCharacter" {...this.props}/>
					</div>

					<div className="search-results">
						{this.props.characters
							// filter by search text
							.filter(character => this.props.selectCharacter.searchText ? character.data.name.toLowerCase().includes(this.props.selectCharacter.searchText.toLowerCase()) : true)
							// show possible bodies
							.map(character =>
								<div
									key={`${character.guid}`}
									className="search-result"
									onClick={() => this.props.history.push(`/character/edit/${character.guid}`)}
								>
									<div className="name">{character.data.name}</div>
								</div>
							)}
					</div>

					<div className="bottom-buttons-container">
						<button className="cancelAction" onClick={() => this.props.history.push('/character/new')}>Add New</button>
					</div>
				</LeftPanel>
				<MainPanel>
				</MainPanel>
			</React.Fragment>
		);
	}
}

BodyView.propTypes = propTypes;
BodyView.defaultProps = defaultProps;
