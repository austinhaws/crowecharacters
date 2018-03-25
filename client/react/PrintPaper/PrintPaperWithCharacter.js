import React from "react";
import PropTypes from "prop-types";
import shared from "../App/Shared";
import BodyView from "../BodyView/BodyView";
import PrintPaper from "./PrintPaper";

export default class PrintPaperWithCharacter extends React.Component {
	render() {
		const data = this.props.character ? this.props.character.data : undefined;

		return data ? (
			<PrintPaper	>
				<BodyView
					bodyGuid={data.bodyGuid}
					fileImages={data.images ? data.images.map(shared.functions.fileByGuid) : undefined}
					printPercent={data ? parseFloat(data.printPercent) : undefined}
					printName={data.printName ? data.name : undefined}
					printCutBorder={data.printCutBorder}
				/>
			</PrintPaper>
		) : undefined;
	}
}

PrintPaperWithCharacter.propTypes = {
	character: PropTypes.object,
};
