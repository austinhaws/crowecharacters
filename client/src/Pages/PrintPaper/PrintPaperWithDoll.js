import React from "react";
import PropTypes from "prop-types";
import BodyView from "../BodyView/BodyView";
import PrintPaper from "./PrintPaper";

const propTypes = {
	doll: PropTypes.object,
	imageSet: PropTypes.object,
};
const defaultProps = {};

export default class PrintPaperWithDoll extends React.Component {
	render() {
		const displayImages =
			this.props.doll &&
			this.props.doll.imageGuids &&

			this.props.imageSet &&
			this.props.imageSet.images &&

			this.props.imageSet.images.filter(image => this.props.doll.imageGuids.includes(image.guid));

		return (this.props.doll && this.props.imageSet) ? (
			<PrintPaper	>
				<BodyView
					bodyGuid={this.props.doll.guid}
					fileImages={displayImages}
					printPercent={this.props.doll.print_percent || 50}
					printName={this.props.doll.print_name ? this.props.doll.name : undefined}
					printCutBorder={this.props.doll.print_cut_border === 1}
				/>
			</PrintPaper>
		) : null;
	}
}

PrintPaperWithDoll.propTypes = propTypes;
PrintPaperWithDoll.defaultProps = defaultProps;
