import React from 'react';
import {Link} from 'react-router';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class AdminBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 3,
    };
  }

  handleChange = (event, index, value) => this.setState({value});

  render() {
    return (
      <Toolbar style={{
      	backgroundColor: "rgba(0, 0, 0, 0.8)", 
      }}>
			<ToolbarGroup style={{
      	marginLeft: "auto", 
      	marginRight: "auto"
			}}>
      <Link to="/users"><RaisedButton label="Users"/></Link>
      <ToolbarSeparator/>
      <Link to="/subs"><RaisedButton label="Submissions"/></Link>
      <ToolbarSeparator/>
      <Link to="/pubs"><RaisedButton label="Publications"/></Link>
      <ToolbarSeparator/>
      <Link to="/calls"><RaisedButton label="Calls"/></Link>
			</ToolbarGroup>
      </Toolbar>
    );
  }
}

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {},
)(AdminBar)