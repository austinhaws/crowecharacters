import PropTypes from "prop-types";
import React from "react";
import {render} from "react-dom";
import {connect, Provider} from "react-redux";
import store from "./Store";
import webservice, {ajaxStatusCore} from "../Common/Webservice";
import {dispatchFieldChanged} from "./Reducers";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Redirect, withRouter} from "react-router";
import NewCharacter from "../Pages/NewCharacter/NewCharacter";
import CharacterSelector from "../Pages/CharacterSelector/CharacterSelector";
import EditCharacter from "../Pages/EditCharacter/EditCharacter";
import Admin from "../Pages/Admin/Admin";
import PrintCharacter from "../Pages/PrintCharacter/PrintCharacter";
import PrintPaper from "../Pages/PrintPaper/PrintPaper";
import BodyView from "../Pages/BodyView/BodyView";
import dataGetter from "../Common/DataGetter";
import Test from "../Pages/Test/Test";
import {Button} from "dts-react-common";
import roles from '../Common/Roles';
import routes from "../Common/Routes";
import LeftPanel from "../Common/Components/Panels/LeftPanel";
import MainPanel from "../Common/Components/Panels/MainPanel";

const propTypes = {
	account: PropTypes.object,
	// bodies: PropTypes.array.isRequired,
	// characters: PropTypes.array.isRequired,
	// files: PropTypes.array.isRequired,
	// printCharacter: PropTypes.object.isRequired,
};
const defaultProps = {
	account: undefined,
};

class AppClass extends React.Component {

	constructor(props) {
		super(props);

		// if not found, then create new account
		webservice.account.get()
			.then(account => {
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
		return <React.Fragment><LeftPanel><div/></LeftPanel><MainPanel><div>Home Page</div></MainPanel></React.Fragment>;
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
					{(this.props.printCharacter && this.props.printCharacter.character) ?
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
						{roles.hasRole(roles.roles.ADMIN) ? <Button onClick={() => routes.admin.home()} label="Admin Area"/> : undefined}
					</div>
					<div id="right-account">
						{this.props.account ? this.props.account.phrase : 'Loading...'} <button>Login to Save</button>
					</div>
				</div>
				<div id="main-container">
					<Switch>
						<Route path="/test" render={() => <Test {...this.props}/>}/>
						<Route path="/admin" render={() => <Admin {...this.props}/>}/>
						<Route path="/character/new" render={() => <NewCharacter {...this.props}/>}/>
						<Route path="/character/edit/:guid" render={router => <EditCharacter guid={router.match.params.guid} {...this.props}/>}/>
						<Route path="/character/print/:guid" render={router => <PrintCharacter guid={router.match.params.guid} {...this.props}/>}/>
						<Route render={this.renderDefault.bind(this)}/>
					</Switch>
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

const App = withRouter(connect(state => { return { account: state.account }; })(AppClass));

render(<BrowserRouter><Provider store={store}><App/></Provider></BrowserRouter>, document.getElementById('react'));
