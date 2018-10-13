import PropTypes from "prop-types";
import React from "react";
import {render} from "react-dom";
import {connect, Provider} from "react-redux";
import store from "./Store";
import webservice, {ajaxStatusCore} from "../Common/Webservice";
import {dispatchFieldChanged} from "./Reducers";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Redirect, withRouter} from "react-router";
import NewCharacter from "../pages/NewCharacter/NewCharacter";
import CharacterSelector from "../pages/CharacterSelector/CharacterSelector";
import EditCharacter from "../pages/EditCharacter/EditCharacter";
import Admin from "../pages/Admin/Admin";
import PrintCharacter from "../pages/PrintCharacter/PrintCharacter";
import PrintPaper from "../pages/PrintPaper/PrintPaper";
import BodyView from "../pages/BodyView/BodyView";
import dataGetter from "../Common/DataGetter";
import Test from "../pages/Test/Test";
import {Button} from "dts-react-common";
import roles from '../Common/Roles';
import routes from "../Common/Routes";
import storage from "../Common/LocalStorage";

const propTypes = {
	account: PropTypes.object,
	bodies: PropTypes.array.isRequired,
	characters: PropTypes.array.isRequired,
	files: PropTypes.array.isRequired,
	printCharacter: PropTypes.object.isRequired,
};
const defaultProps = {
	account: undefined,
};

class AppClass extends React.Component {

	constructor(props) {
		super(props);

		// get current account guid from localstorage
		const accountGuid = storage.account.getPhrase();

		// if not found, then create new account
		webservice.account[accountGuid ? 'get' : 'new'](accountGuid)
			.then(account => {
				// store accountGuid in localstorage
				storage.account.setPhrase(account.phrase);

				// dispatch set account information
				dispatchFieldChanged(undefined, 'account', account);
				return account;
			})
			// load account information
			.then(account => {
				webservice.body.all(account.guid);
				webservice.file.all(account.guid);
				webservice.character.all(account.guid);
			});
	}

	renderDefault() {
		let output;

		// if there are characters then show the character picker
		if (this.props.characters.length) {
			output = <CharacterSelector {...this.props}/>;

		// no characters, so check if still ajaxing for characters
		} else if (ajaxStatusCore.isAjaxing()) {
			output = <div>show spinner</div>;

		// not ajaxing, still no characters, go to character creation
		} else {
			output = <Redirect to="/character/new"/>;
		}

		return output;
	}

	render() {
		return (
			<div id="app-container">
				<div className="print-container print-only">
					{this.props.printCharacter.character ?
						<PrintPaper>
							<BodyView
								bodyGuid={this.props.printCharacter.character.data.bodyGuid}
								fileImages={this.props.printCharacter.character.data.images ? this.props.printCharacter.character.data.images.map(dataGetter.fileByGuid) : undefined}
								printPercent={this.props.printCharacter.character ? parseFloat(this.props.printCharacter.character.data.printPercent) : undefined}
								printName={this.props.printCharacter.character.data.printName ? this.props.printCharacter.character.data.name : undefined}
								printCutBorder={this.props.printCharacter.character.data.printCutBorder}
								{ ...this.props }
							/>
						</PrintPaper>
						: undefined}
				</div>
				<div id="top-title-container">
					<div id="top-title">Crowe Character</div>
					<div id="left-account">
						{roles.hasRole('admin') ? <Button onClick={() => routes.admin.body.list()} label="Admin Area"/> : undefined}
					</div>
					<div id="right-account">
						Your Id: {this.props.account ? this.props.account.phrase : 'Loading...'} <button>Login to Save</button>
					</div>
				</div>
				<div id="main-container">
					{(ajaxStatusCore.isAjaxing() && (!this.props.characters.length || !this.props.bodies.length || !this.props.files.length)) ? <div>Loading...</div> :
						<Switch>
							<Route path="/test" render={() => <Test {...this.props}/>}/>
							<Route path="/admin" render={() => <Admin {...this.props}/>}/>
							<Route path="/character/new" render={() => <NewCharacter {...this.props}/>}/>
							<Route path="/character/edit/:guid" render={router => <EditCharacter guid={router.match.params.guid} {...this.props}/>}/>
							<Route path="/character/print/:guid" render={router => <PrintCharacter guid={router.match.params.guid} {...this.props}/>}/>
							<Route render={this.renderDefault.bind(this)}/>
						</Switch>
					}
				</div>
				<div id="credit-footer">
					<div>Icons made by <a href="https://www.flaticon.com/authors/lucy-g" title="Lucy G">Lucy G</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></div>
				</div>
			</div>
		);
	}
}

AppClass.propTypes = propTypes;
AppClass.defaultProps = defaultProps;

const App = withRouter(connect(state => state)(AppClass));

render(<BrowserRouter><Provider store={store}><App/></Provider></BrowserRouter>, document.getElementById('react'));
