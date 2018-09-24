import React from "react";
import PropTypes from "prop-types";
import images from "../Common/Images";
import {objectAtPath} from "dts-react-common";
import {dispatchFieldChanged} from "../App/Reducers";

const propTypes = {
	// path in the store to the object that holds the searchText field
	objectPath: PropTypes.string.isRequired,
};
const defaultProps = {};

export default class SearchInput extends React.Component {

	render() {
		return (
			<React.Fragment>
				<input
					className="search"
					type="text"
					value={objectAtPath(this.props, this.props.objectPath).searchText || ''}
					onChange={e => dispatchFieldChanged(this.props.objectPath, 'searchText', e.target.value)}
				/>
				{images.magnifyingGlass()}
			</React.Fragment>
		);
	}
}

SearchInput.propTypes = propTypes;
SearchInput.defaultProps = defaultProps;
