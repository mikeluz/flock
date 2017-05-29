import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

const Pubs = ({ user, pubs }) => (

  <div>
   {user ? <div>{user.isAdmin ? <h1>PUBLICATIONS</h1> : <h2>You are trying to access an Admin Only area.</h2>}</div> : <h2>Please log in.</h2>}
  
  <Table   
	  height={'400px'}
	  fixedHeader={true}
	  fixedFooter={true}
	  style={{
    	backgroundColor: 'rgba(240, 240, 240, 0.8)', textColor: '#ffffff'}}>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Name</TableHeaderColumn>
	      <TableHeaderColumn>Web Address</TableHeaderColumn>
        <TableHeaderColumn>Submittable Link</TableHeaderColumn>
        <TableHeaderColumn>Format</TableHeaderColumn>
        <TableHeaderColumn>Type</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
	  {pubs && pubs.map(pub => (
      <TableRow>
        <TableRowColumn>{pub.pub_name}</TableRowColumn>
        <TableRowColumn>{pub.web_address}</TableRowColumn>
        <TableRowColumn>{pub.submittable_link}</TableRowColumn>
        <TableRowColumn>{pub.pub_format}</TableRowColumn>
        <TableRowColumn>{pub.pub_type}</TableRowColumn>
      </TableRow>)
	  )}
    </TableBody>
  </Table>
  </div>
)

import {connect} from 'react-redux'

export default connect(
  ({ auth, allPubs }) => ({ 
  	user: auth,
  	pubs: allPubs
  }), {},
)(Pubs)
