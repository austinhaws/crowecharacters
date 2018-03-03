import React from "react";
import LeftPanel from "../Panels/LeftPanel";
import MainPanel from "../Panels/MainPanel";
import PropTypes from "prop-types";
import shared from "../App/Shared";
import SearchInput from "../Common/SearchInput";
import TopNavigation from "../App/TopNavigation";

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
									className={shared.functions.joinClasses(['search-result'])}
									onClick={() => this.props.history.push(`/character/edit/${character.guid}`)}
								>
									<div className="name">{character.data.name}</div>
								</div>
							)}
					</div>

					<div className="bottom-buttons-container">
						<button className="cancelAction" onClick={() => console.log('react router cancel!')}>put add and delete little buttons down here</button>
					</div>
				</LeftPanel>
				<MainPanel>
					Gimme Some News
				</MainPanel>
			</React.Fragment>
		);
	}
}

CharacterSelector.propTypes = {
	characters: PropTypes.array.isRequired,
	selectCharacter: PropTypes.object.isRequired,
};

