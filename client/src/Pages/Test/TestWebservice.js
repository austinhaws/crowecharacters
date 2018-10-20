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
		this.fileChangeHandler = this.fileChangeHandler.bind(this);

		this.state = {
			output: '',
			imageSet: undefined,
			selectedFile: undefined,
			uploadedImage: undefined,
		};

		this.testUrls = [
			// ===== Account ==== //
			{title: 'Account: Get', testFunc: () => webservice.account.get().then(this.outputData)},
			{
				title: 'Account: new', testFunc: () => {
					storage.account.setGuid(undefined);
					webservice.account.get().then(this.outputData);
				}
			},

			// ===== Image Set ==== //
			{title: 'Image Set: All', testFunc: () => webservice.imageSet.all().then(this.outputData).then(imageSets => this.setState({imageSet: imageSets[0]}))},
			{title: 'Image Set: New', testFunc: () => webservice.imageSet.save({name: 'test'}).then(this.outputData)},
			{
				title: 'Image Set: Get', testFunc: () => {
					if (!this.state.imageSet) {
						alert('run Image Set: All first');
					} else {
						webservice.imageSet.get(this.state.imageSet.guid).then(this.outputData);
					}
				}
			},
			{
				title: 'Image Set: Delete', testFunc: () => {
					if (!this.state.imageSet.guid) {
						alert('run Image Set: All first');
					} else {
						webservice.imageSet.delete(this.state.imageSet.guid).then(this.outputData);
					}
				}
			},


			// ===== Image ==== //
			{
				title: 'Image: Upload', testFunc: () => {
					if (!this.state.selectedFile) {
						alert('Select a file first');
					} else {
						webservice.image.upload(this.state.selectedFile)
							.then(uploadedImage => {
								this.setState({ uploadedImage });
								return uploadedImage;
							})
							.then(this.outputData);
					}
				}
			},
			{
				title: 'Image: Tie to ImageSet', testFunc: () => {
					if (!this.state.imageSet) {
						alert('run Image Set: All first');
					} else if (!this.state.uploadedImage) {
						alert('Upload a file first');
					} else {
						webservice.image.tieToImageSet(this.state.uploadedImage.guid, this.state.imageSet.guid, this.state.imageSet.images ? this.state.imageSet.images.length : 0)
							.then(data => {
								// can't tie it together again since that creates a unique constraint error
								this.setState({ uploadedImage: undefined });
								return data;
							})
							.then(this.outputData);
					}
				},
			},
			{
				title: 'Image: Update', testFunc: () => {
					if (!this.state.uploadedImage) {
						alert('Upload a file first');
					} else {
						this.state.uploadedImage.pretty_name += '.';
						this.setState({ uploadedImage: {...this.state.uploadedImage }});
						webservice.image.save(this.state.uploadedImage)
							.then(this.outputData);
					}
				}
			}
		];
	}

	outputData(data) {
		this.setState({output: JSON.stringify(data)});
		return data;
	}

	fileChangeHandler(e) {
		this.setState({ selectedFile: e.target.files[0] });
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
					<div className="test-webservice__image-upload">
						Image file to upload: <input type="file" onChange={this.fileChangeHandler}/>
					</div>
					<div className="output">{this.state.output}</div>
				</MainPanel>
			</React.Fragment>
		);
	}
}

TestWebservice.propTypes = propTypes;
TestWebservice.defaultProps = defaultProps;
