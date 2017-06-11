import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class NavBar extends React.Component {

  constructor(props) {
    super(props);

    // bind all handlers
    this.handlePubClick = this.handlePubClick.bind(this);
    this.handleJotClick = this.handleJotClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handlePoemClick = this.handlePoemClick.bind(this);
    this.handleCallClick = this.handleCallClick.bind(this);
    this.handleSubClick = this.handleSubClick.bind(this);
  }

  handlePubClick() {
    // find pubs by name, passing empty string gets all
    this.props.findPubsByName('');
  }

  handleUserClick() {
    // simple get all users
    this.props.getAllUsers();
  }

  handlePoemClick() {
    // find poems by name, passing empty string gets all
    this.props.findPoemsByName('');
    // also load all users
    this.props.getAllUsers();
  }

  handleCallClick() {
    // find calls by name, passing empty string gets all
    this.props.findCallsByName('');
  }

  handleSubClick() {
    // find subs by user name, passing empty string gets all
    this.props.findSubsByUserName('');
  }

  handleJotClick() {
    // get current jot
    this.props.getCurrentJot();
  }

  render() {

    // 'is Admin' boolean from db
    let userIsAdmin = this.props.user.isAdmin
    // if not admin, add "auto" as left margin to nonadmin navbar, else null
    let nonAdminCenteringBool = this.props.user.isAdmin ? null : "auto"

      return (
      <div>

        <Toolbar style={{
        	backgroundColor: "rgba(0, 0, 0, 0.8)", 
        }}>

          {/* admin portion of navbar */}
          {userIsAdmin && 
          <ToolbarGroup style={{
            marginLeft: "auto", 
          }}>
          <a href="/api/subs/current/clear"><RaisedButton label="Finish Sub" backgroundColor='red'/></a>
          <ToolbarSeparator/>
          <Link to="/users"><RaisedButton label="Users" onClick={this.handleUserClick}/></Link>
          <ToolbarSeparator/>
          <Link to="/subs"><RaisedButton label="Submissions" onClick={this.handleSubClick}/></Link>
          <ToolbarSeparator/>
          <Link to="/poems"><RaisedButton label="Poems" onClick={this.handlePoemClick}/></Link>
          <ToolbarSeparator/>
          </ToolbarGroup>}
          {/* admin portion of navbar */}

          <ToolbarGroup style={{
            marginRight: "auto",
            marginLeft: nonAdminCenteringBool
          }}>
          <Link to="/pubs"><RaisedButton label="Publications" onClick={this.handlePubClick}/></Link>
          <ToolbarSeparator/>
          <Link to="/calls"><RaisedButton label="Calls" onClick={this.handleCallClick}/></Link>
          <ToolbarSeparator/>
          <Link to="/flockpad"><RaisedButton backgroundColor='green' label="FlockPad" labelColor="white" onClick={this.handleJotClick}/></Link>
      		</ToolbarGroup>

        </Toolbar>
      
      </div>
      )
  }
}

import {connect} from 'react-redux'

// action creators
import {findPubsByName} from '../reducers/pubSearchResults'
import {findCallsByName} from '../reducers/callSearchResults'
import {findPoemsByName} from '../reducers/poemSearchResults'
import {findSubsByUserName} from '../reducers/subSearchResults'
import {getAllUsers} from '../reducers/users'
import {getCurrentJot} from '../reducers/currentJot'

export default connect(
  ({ auth }) => ({ 
    user: auth
  }), {getAllUsers, 
    findPubsByName,
    findCallsByName,
    findPoemsByName,
    findSubsByUserName,
    getCurrentJot},
)(NavBar)