import React from 'react'
import {Link} from 'react-router'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import {RaisedButton} from 'material-ui'

class Users extends React.Component {

	constructor (props) {
		super(props);
	}

	render() {
    return (
      <div>
      {this.props.user ?
      <div id="centerMe">
      <br/>
      <div>{this.props.user.isAdmin ?
        <Table   
      	  height={'300px'}
          width={'20%'}
      	  fixedHeader={true}
      	  fixedFooter={true}
          selectable={false}
      	  style={{
          	backgroundColor: 'rgba(240, 240, 240, 0.8)', textColor: '#ffffff'}}>
          <TableHeader 
            adjustForCheckbox={false}
            displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><h1 id="title">Users</h1></TableHeaderColumn>
                <TableHeaderColumn>{this.props.user.isAdmin && <div id="centerMeTable"><Link to="/users/add"><RaisedButton label="New"/></Link><br/><br/></div>}</TableHeaderColumn>
                <TableHeaderColumn></TableHeaderColumn>
              </TableRow>
            <TableRow>
              <TableHeaderColumn><h2 id="title">Name</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
      	  {this.props.users && this.props.users.map(user => (
            <TableRow key={user.id}>
              <TableRowColumn><Link to={`/users/${user.id}`}>{user.name}</Link></TableRowColumn>
            </TableRow>)
      	  )}
          </TableBody>
        </Table>
        :
        <h2>You are trying to access an Admin Only area.</h2>
      }</div>
      </div> : <h2 id="centerMe">Please log in.</h2>}
      </div>
    )
	}
}

import {connect} from 'react-redux'

export default connect(
  ({ auth, users }) => ({ 
  	user: auth,
  	users
  }), {}
)(Users)