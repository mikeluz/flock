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
var moment = require('moment');

class DashSubs extends React.Component {
  
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div id="activeSubs">
      <h2 id="centerMe">Active Submissions</h2>
      <br /><br />
        <Table   
          height={'300px'}
          fixedHeader={true}
          fixedFooter={true}
          selectable={false}
          style={{
            backgroundColor: 'rgba(240, 240, 240, 0.8)', textColor: '#ffffff', width: '100%', textAlign: 'center'}}>
            <TableHeader 
              adjustForCheckbox={false}
              displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn><h2 id="title">Date Submitted</h2></TableHeaderColumn>
                <TableHeaderColumn><h2 id="title">Publication</h2></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
            {
              this.props.userSubs && this.props.userSubs.filter((sub) => {
                return sub.sub_status === "in process"
              }).sort((a, b) => {
                return new Date(b.sub_date) - new Date(a.sub_date)
              })
              .map(sub => {
                return (
                  <TableRow key={sub.id}>
                    <TableRowColumn><Link to={`/subs/${sub.id}`}>{moment(sub.sub_date).format('LL')}</Link></TableRowColumn>
                    <TableRowColumn><Link to={`/calls/${sub.call.id}`}>{sub.pub.pub_name}</Link></TableRowColumn>
                  </TableRow>
                )
              })
            }
            </TableBody>
        </Table>
      </div>
  )}
}

import {connect} from 'react-redux'

export default connect(
  ({ auth, userSubs }) => ({ 
  	user: auth,
    userSubs: userSubs
  }), {}
)(DashSubs)