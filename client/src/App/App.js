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
import Test from "../Pages/Test/Test";
import {history, HistoryBrowserRouter} from "../Common/Routes";
import "../scss/index.scss";
import Home from "../Pages/Home/Home";
import Doll from "../Pages/Doll/Doll";
import PrintPaperWithDoll from "../Pages/PrintPaper/PrintPaperWithDoll";

const propTypes = {
	account: PropTypes.object,
};
const defaultProps = {
	account: undefined,
};
const mapStateToProps = state => {
	return {
		account: state.account,
		printDoll: state.printDoll,
	};
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
					{(this.props.printDoll.doll && this.props.printDoll.imageSet) ?
						<PrintPaperWithDoll
							imageSet={this.props.printDoll.imageSet}
							doll={this.props.printDoll.doll}
						/>
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
							<Route path="/test" component={Test}/>
							<Route path="/admin" component={Admin}/>
							<Route path="/doll" component={Doll}/>
							<Route component={Home}/>
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

const App = withRouter(connect(mapStateToProps)(AppClass));
render(<HistoryBrowserRouter><Provider store={store}><App/></Provider></HistoryBrowserRouter>, document.getElementById('react'));
