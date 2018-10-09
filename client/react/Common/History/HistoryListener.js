import React from 'react';
import {withRouter} from 'react-router';
import ReactRouterPropTypes from 'react-router-prop-types';

// copied and modified from: https://github.com/Tomekmularczyk/react-router-global-history/blob/master/src/index.jsx

// backlog of history calls before history was connected
const historyBackLog = [];
// pretend history exists, but cache calls to it until it does
export let history = {
	push: historyBackLog.push,
};

const propTypes = {
	history: ReactRouterPropTypes.history.isRequired,
};
const defaultProps = {};

// listen for when history gets passed in
class Spy extends React.Component {
	constructor(props) {
		super(props);

		// set history and run any outstanding calls (history has to be constant to be defaullt
		history = props.history;
		historyBackLog.forEach(history.push);
	}

	render() {
		return null;
	}
}
Spy.propTypes = propTypes;
Spy.defaultProps = defaultProps;
export const ReactRouterGlobalHistory = withRouter(Spy);
