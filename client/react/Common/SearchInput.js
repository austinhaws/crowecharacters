import React from "react";
import PropTypes from "prop-types";
import shared from "../App/Shared";

export default class SearchInput extends React.Component {

	render() {
		return (
			<React.Fragment>
				<input
					className="search"
					type="text"
					value={shared.functions.objectAtPath(this.props, this.props.objectPath).searchText || ''}
					onChange={e => shared.functions.dispatchFieldChanged(this.props.objectPath, 'searchText', e.target.value)}
				/>
				{shared.images.magnifyingGlass()}
			</React.Fragment>
		);
	}
}

SearchInput.propTypes = {
	// path in the store to the object that holds the searchText field
	objectPath: PropTypes.string.isRequired,
};

