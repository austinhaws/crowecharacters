import React from "react";
import webservice from "../../Common/Webservice";
import {Button, InputInformation} from "dts-react-common";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import storage from "../../Common/LocalStorage";

const propTypes = {};

const defaultProps = {};

export default class TestWebservice extends React.Component {

	constructor(props) {
		super(props);

		this.outputData = this.outputData.bind(this);

		this.state = {
			output: '',
			imageSetGuid: undefined,
		};

		this.testUrls = [
			{title: 'All', testFunc: () => this.testUrls.filter(testUrl => testUrl.title !== 'All').forEach(testUrl => testUrl.testFunc())},

			{title: 'Account: Get', testFunc: () => webservice.account.get().then(this.outputData)},
			{
				title: 'Account: new', testFunc: () => {
					storage.account.setGuid(undefined);
					webservice.account.get().then(this.outputData);
				}
			},

			{title: 'Image Set: All', testFunc: () => webservice.imageSet.all().then(this.outputData).then(imageSets => this.setState({imageSetGuid: imageSets[0].guid}))},
			{title: 'Image Set: New', testFunc: () => webservice.imageSet.save({name: 'test'}).then(this.outputData)},
			{
				title: 'Image Set: Get', testFunc: () => {
					if (!this.state.imageSetGuid) {
						alert('run Image Set: All first');
					} else {
						webservice.imageSet.get(this.state.imageSetGuid).then(this.outputData);
					}
				}
			},
			{
				title: 'Image Set: Delete', testFunc: () => {
					if (!this.state.imageSetGuid) {
						alert('run Image Set: All first');
					} else {
						webservice.imageSet.delete(this.state.imageSetGuid).then(this.outputData);
					}
				}
			},

			// { title: 'Body: All', testFunc: () => webservice.body.all().then(this.outputData)},
			// { title: 'Body: Save', testFunc: () => webservice.body.save(store.getState().bodies[0]).then(this.outputData)},
			// // { title: 'Body: Create', testFunc: () => webservice.body.create(store.getState().bodies[0]).then(this.outputData)}, <-- need a file to test this one
			//
			// { title: 'Character: Create', testFunc: () => webservice.character.create({}).then(this.outputData) },
			// { title: 'Character: All', testFunc: () => webservice.character.all().then(this.outputData) },
			// { title: 'Character: Update', testFunc: () => webservice.character.update(store.getState().characters.length ? store.getState().characters[0] : {}).then(this.outputData) },
			//
			// { title: 'File: All', testFunc: () => webservice.file.all().then(this.outputData) },
			// { title: 'File: Upload', testFunc: () => webservice.file.upload().then(this.outputData()) },  <-- requires a file
		];
	}

	outputData(data) {
		this.setState({output: JSON.stringify(data)});
		return data;
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
					<div className="test-webservice__disclaimer">This will set data in the database! It will change your account!! Don't run these!!!</div>
					<div className="output">{this.state.output}</div>
				</MainPanel>
			</React.Fragment>
		);
	}
}

TestWebservice.propTypes = propTypes;
TestWebservice.defaultProps = defaultProps;
