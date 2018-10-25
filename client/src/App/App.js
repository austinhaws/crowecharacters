import PropTypes from "prop-types";
import React from "react";
import {render} from "react-dom";
import {connect, Provider} from "react-redux";
import store from "./Store";
import webservice from "../Common/Webservice";
import {dispatchFieldChanged} from "./Reducers";
import {Route, Switch} from 'react-router-dom';
import {Router, withRouter} from "react-router";
import Admin from "../Pages/Admin/Admin";
import PrintPaper from "../Pages/PrintPaper/PrintPaper";
import BodyView from "../Pages/BodyView/BodyView";
import dataGetter from "../Common/DataGetter";
import Test from "../Pages/Test/Test";
import {history, HistoryBrowserRouter} from "../Common/Routes";
import "../scss/index.scss";
import Home from "../Pages/Home/Home";

const propTypes = {
	account: PropTypes.object,
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
			});
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
					<div id="right-account">
						{this.props.account ? this.props.account.phrase : 'Loading...'} <button>Login</button>
					</div>
				</div>
				<div id="main-container">
					<Router history={history}>
						<Switch>
							<Route path="/test" comopnent={Test}/>
							<Route path="/admin" component={Admin}/>
							<Route component={Home}/>

							{/*<Route path="/character/new" render={() => <NewCharacter {...this.props}/>}/>*/}
							{/*<Route path="/character/edit/:guid" render={router => <EditCharacter guid={router.match.params.guid} {...this.props}/>}/>*/}
							{/*<Route path="/character/print/:guid" render={router => <PrintCharacter guid={router.match.params.guid} {...this.props}/>}/>*/}

						</Switch>
					</Router>
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

render(<HistoryBrowserRouter><Provider store={store}><App/></Provider></HistoryBrowserRouter>, document.getElementById('react'));
