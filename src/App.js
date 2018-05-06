import React, { Component } from "react"
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import StellarForm from "./Stellar"

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

import { MenuList, MenuItem } from 'material-ui/Menu'
import { ListItemIcon, ListItemText } from 'material-ui/List'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import DraftsIcon from '@material-ui/icons/Drafts'
import SendIcon from '@material-ui/icons/Send'

import { Grid, Row, Col } from 'react-flexbox-grid'
import { withStyles } from 'material-ui/styles';


class SimpleAppBar extends Component {
	render() {
		return (
			<div>
				<AppBar position="fixed" color="primary">
					<Toolbar>
						<Typography variant="title" color="inherit">
							Your Stellar Helper
						</Typography>
					</Toolbar>
				</AppBar>
			</div>
		);
	}
}

const styleApp = {
    main: {
        marginTop: "80px",
    },
}

class App extends Component {
	render() {
		return <div>
			<SimpleAppBar />
			<Grid fluid className={this.props.classes.main}>
				<Router>
					<Row>
						<Col item xs={3}>
							<MenuList>
								<Link to="/" style={{ textDecoration: 'none' }}>
									<MenuItem>
										<ListItemIcon><SendIcon /></ListItemIcon>
										<ListItemText inset primary="Your Stellar" />
									</MenuItem>
								</Link>
								<Link to="/changetrust" style={{ textDecoration: 'none' }}>
									<MenuItem>
										<ListItemIcon><DraftsIcon /></ListItemIcon>
										<ListItemText inset primary="Change trust" />
									</MenuItem>
								</Link>
								<Link to="/about" style={{ textDecoration: 'none' }}>
									<MenuItem>
										<ListItemIcon><InboxIcon /></ListItemIcon>
										<ListItemText inset primary="About" />
									</MenuItem>
								</Link>
							</MenuList>
						</Col>

						<Col item xs={9}>
							<Route exact path="/" component={StellarForm} />
						</Col>
					</Row>
				</Router>
			</Grid>
		</div>
	}
}

let AppStyled = withStyles(styleApp)(App)

export default AppStyled
