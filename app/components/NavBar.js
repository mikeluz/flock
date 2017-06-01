import React from 'react';
import {Link} from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.props.getAllPubs();
  }

  render() {
      return (
      <div>
      <Toolbar style={{
      	backgroundColor: "rgba(0, 0, 0, 0.8)", 
      }}>
  		<ToolbarGroup style={{
      	marginLeft: "auto", 
      	marginRight: "auto"
  		}}>
      {this.props.user.isAdmin && <Link to="/users"><RaisedButton label="Users"/></Link>}
      {this.props.user.isAdmin && <ToolbarSeparator/>}
      {this.props.user.isAdmin && <Link to="/subs"><RaisedButton label="Submissions"/></Link>}
      {this.props.user.isAdmin && <ToolbarSeparator/>}
      <Link to="/pubs"><RaisedButton label="Publications" onClick={this.handleClick}/></Link>
      <ToolbarSeparator/>
      <Link to="/calls"><RaisedButton label="Calls"/></Link>
      <ToolbarSeparator/>
      <Link to="/flockpad"><RaisedButton label="FlockPad"/></Link>
  		</ToolbarGroup>
      </Toolbar>
      </div>
      )
  }

}

import {connect} from 'react-redux'
import {getAllPubs} from '../reducers/allPubs'

export default connect(
  ({ auth, allPubs }) => ({ 
    user: auth,
    pubs: allPubs 
  }), {getAllPubs},
)(NavBar)