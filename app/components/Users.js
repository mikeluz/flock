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
		console.log("props", this.props);
    return (
      <div>
       {/*user ? <div>{user.isAdmin ? <h1>PUBLICATIONS</h1> : <h2>You are trying to access an Admin Only area.</h2>}</div> : <h2>Please log in.</h2>*/}
      {this.props.user ?
      <div id="centerMe">
      <h1>Users</h1>{this.props.user.isAdmin && <div><Link to="/users/add"><RaisedButton label="Add"/></Link><br/><br/></div>}
      <Table   
    	  height={'300px'}
    	  fixedHeader={true}
    	  fixedFooter={true}
        selectable={false}
    	  style={{
        	backgroundColor: 'rgba(240, 240, 240, 0.8)', textColor: '#ffffff'}}>
        <TableHeader 
          adjustForCheckbox={false}
          displaySelectAll={false}>
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
      </Table></div> : <h2>Please log in.</h2>}
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