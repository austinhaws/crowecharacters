import React from "react";
import {render} from "react-dom";
import {connect, Provider} from "react-redux";
import store from "./Store";
import NewCharacter from "../NewCharacter/NewCharacter";
import shared from "./Shared";
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Redirect, withRouter} from "react-router";
import CharacterSelector from "../CharacterSelector/CharacterSelector";
import EditCharacter from "../EditCharacter/EditCharacter";

shared.functions.appStartup();

class AppClass extends React.Component {

	renderDefault() {
		let output;

		// if there are characters then show the character picker
		if (this.props.characters.length) {
			output = <div><CharacterSelector {...this.props}/></div>;

		// no characters, so check if still ajaxing for characters
		} else if (this.props.ajaxingCount) {
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
				<div id="top-title-container">
					<div id="top-title">Crowe Character</div>
					<div id="right-account">
						Your Id: {this.props.account ? this.props.account.phrase : 'Loading...'} <button>Login to Save</button>
					</div>
				</div>
				<div id="main-container">
					{(this.props.ajaxingCount && (!this.props.characters.length || !this.props.bodies.length || !this.props.files.length)) ? <div>Loading...</div> :
						<Switch>
							<Route path='/character/new' render={() => <NewCharacter {...this.props}/>}/>
							<Route path='/character/edit/:guid' render={router => <EditCharacter guid={router.match.params.guid} {...this.props}/>}/>
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

AppClass.propTypes = {
};

const App = withRouter(connect(
	state => state,
	dispatch => { return {}},
)(AppClass));

render(<BrowserRouter basename="/crowe/client"><Provider store={store}><App/></Provider></BrowserRouter>, document.getElementById('react'));
