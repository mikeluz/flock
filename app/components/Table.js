import React from 'react'
import axios from 'axios'
import {Link} from 'react-router'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import {RaisedButton} from 'material-ui'

const TableComponent = (props) => (

  <Table   
  height={'300px'}
  fixedHeader={true}
  fixedFooter={true}
  selectable={false}
  style={{
    backgroundColor: 'rgba(240, 240, 240, 0.8)', 
    textColor: '#ffffff'
  }}>
    <TableHeader 
      adjustForCheckbox={false}
      displaySelectAll={false}>
      <TableRow>
        <TableHeaderColumn><h2 id="title">Name</h2></TableHeaderColumn>
        <TableHeaderColumn><h2 id="title">Web Address</h2></TableHeaderColumn>
        <TableHeaderColumn><h2 id="title">Submittable Link</h2></TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
    {this.props.data && this.props.data.map(data => {
      
      return (
      <TableRow key={data.id}>
        <TableRowColumn><Link to={`/pubs/${data.id}`}>{pub.pub_name}</Link></TableRowColumn>
        <TableRowColumn><a href={data.web_address}>{pub.web_address}</a></TableRowColumn>
        <TableRowColumn><a href={data.submittable_link}>{pub.submittable_link}</a></TableRowColumn>
      </TableRow>)}
    )}
    </TableBody>
  </Table>

)

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ 
  	user: auth,
  }), {},
)(TableComponent)
