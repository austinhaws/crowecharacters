import React from "react";
import webservice from "../../Common/Webservice";
import {Button, InputInformation} from "dts-react-common";
import store from "../../App/Store.js";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";

const propTypes = {};

const defaultProps = {};

export default class TestWebservice extends React.Component {

	constructor(props) {
		super(props);

		this.outputData = this.outputData.bind(this);

		this.state = {
			output: '',
		};

		this.testUrls = [
			{ title: 'All', testFunc: () => this.testUrls.filter(testUrl => testUrl.title !== 'All').forEach(testUrl => testUrl.testFunc()) },
			{ title: 'Account: Get', testFunc: () => webservice.account.get().then(this.outputData) },

			{ title: 'Body: All', testFunc: () => webservice.body.all().then(this.outputData)},
			{ title: 'Body: Save', testFunc: () => webservice.body.save(store.getState().bodies[0]).then(this.outputData)},
			// { title: 'Body: Create', testFunc: () => webservice.body.create(store.getState().bodies[0]).then(this.outputData)}, <-- need a file to test this one

			{ title: 'Character: Create', testFunc: () => webservice.character.create({}).then(this.outputData) },
			{ title: 'Character: All', testFunc: () => webservice.character.all().then(this.outputData) },
			{ title: 'Character: Update', testFunc: () => webservice.character.update(store.getState().characters.length ? store.getState().characters[0] : {}).then(this.outputData) },

			{ title: 'File: All', testFunc: () => webservice.file.all().then(this.outputData) },
			// { title: 'File: Upload', testFunc: () => webservice.file.upload().then(this.outputData()) },  <-- requires a file
		];
	}

	outputData(data) {
		this.setState({ output: JSON.stringify(data) });
	}

	render() {
		return (
			<React.Fragment>
				<LeftPanel>
					<div>
						{this.testUrls.map(testUrl => {
							return <div key={testUrl.title}><Button onClick={testUrl.testFunc} label={testUrl.title} className={InputInformation.SIZE.LARGE}/></div>;
						})}
					</div>
				</LeftPanel>
				<MainPanel>
					<div className="output">{this.state.output}</div>
				</MainPanel>
			</React.Fragment>
		);
	}
}

TestWebservice.propTypes = propTypes;
TestWebservice.defaultProps = defaultProps;
