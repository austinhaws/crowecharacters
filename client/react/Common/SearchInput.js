import React from "react";
import PropTypes from "prop-types";
import shared from "../App/Shared";
import images from "../Common/Images";
import {objectAtPath} from "dts-react-common";

export default class SearchInput extends React.Component {

	render() {
		return (
			<React.Fragment>
				<input
					className="search"
					type="text"
					value={objectAtPath(this.props, this.props.objectPath).searchText || ''}
					onChange={e => shared.functions.dispatchFieldChanged(this.props.objectPath, 'searchText', e.target.value)}
				/>
				{images.magnifyingGlass()}
			</React.Fragment>
		);
	}
}

SearchInput.propTypes = {
	// path in the store to the object that holds the searchText field
	objectPath: PropTypes.string.isRequired,
};

