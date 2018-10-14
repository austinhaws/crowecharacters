import React from "react";
import LeftPanel from "../../Common/Components/Panels/LeftPanel";
import TopNavigation from "../../App/TopNavigation";
import MainPanel from "../../Common/Components/Panels/MainPanel";
import roles from "../../Common/Roles";
import routes from "../../Common/Routes";

const propTypes = {};

const defaultProps = {};

export default class AdminHome extends React.Component {
	componentDidMount() {
		roles.requireRole(roles.roles.ADMIN);
	}

	render() {
		return (
			<React.Fragment>
				<TopNavigation pageTitle="Admin - Home" backUrl="/admin"/>

				<LeftPanel><div/></LeftPanel>

				<MainPanel>
					<ul className="main-panel__menu-list">
						<li className="main-panel__menu-list-item" onClick={() => routes.admin.imageSet.list()}>Image Sets</li>
					</ul>
				</MainPanel>

			</React.Fragment>
		);
	}
}

AdminHome.propTypes = propTypes;
AdminHome.defaultProps = defaultProps;
