import React from "react";
import PropTypes from "prop-types";
import BodyView from "../BodyView/BodyView";
import PrintPaper from "./PrintPaper";
import dataGetter from "../Common/DataGetter";

const propTypes = {
	character: PropTypes.object,
};
const defaultProps = {};

export default class PrintPaperWithCharacter extends React.Component {
	render() {
		const data = this.props.character ? this.props.character.data : undefined;

		return data ? (
			<PrintPaper	>
				<BodyView
					bodyGuid={data.bodyGuid}
					fileImages={data.images ? data.images.map(dataGetter.fileByGuid) : undefined}
					printPercent={data ? parseFloat(data.printPercent) : undefined}
					printName={data.printName ? data.name : undefined}
					printCutBorder={data.printCutBorder}
				/>
			</PrintPaper>
		) : undefined;
	}
}

PrintPaperWithCharacter.propTypes = propTypes;
PrintPaperWithCharacter.defaultProps = defaultProps;
