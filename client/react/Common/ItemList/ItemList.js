import React from "react";
import PropTypes from "prop-types";
import shared from "../../App/Shared";

export default class ItemList extends React.Component {
	render() {
		return (
			<div className="items-list">
				{this.props.items.map((item, i) =>
					<div
						key={i}
						className={shared.functions.joinClasses(['item-row', item === this.props.selectedItem ? 'selected' : undefined])}
						onClick={() => this.props.onSelectChange ? this.props.onSelectChange(item) : undefined}>
						{this.props.onRenderItem(item)}
					</div>
				)}
			</div>
		);
	}
}

ItemList.propTypes = {
	// the items to show
	items: PropTypes.array.isRequired,

	// which item is selected
	selectedItem: PropTypes.object,

	// called when the selected item is changed
	onSelectChange: PropTypes.func,

	// passed the item, and gets back what to display for that item
	// will already be wrapped in a div, so then can put whatever else you want in there
	onRenderItem: PropTypes.func.isRequired,
};

