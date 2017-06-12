import React from 'react'
import {Link} from 'react-router'
import Chart from 'chart.js'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import {RaisedButton} from 'material-ui'
var moment = require('moment');

const upcomingDeadlines = (calls, deadlineWindow) => {

  const today = new Date();

  let deadlines = calls.filter(call => {
    let deadline = new Date(call.call_end);
    return Math.ceil((deadline - today) / (1000 * 3600 * 24)) < deadlineWindow;
  })

  return deadlines.sort((a, b) => {
      return new Date(b.sub_date) - new Date(a.sub_date)
    });

}

class DashDeadlines extends React.Component {
  
  constructor(props) {
    super(props)
    this.state = {
      deadlineWindow: 360,
    }
    this.setDeadlineWindow = this.setDeadlineWindow.bind(this)
  }

  setDeadlineWindow(evt) {
    this.setState({
      deadlineWindow: evt.target.value
    })
  }

  render() {
    return (
      <div id="deadlines">
      <h2>Upcoming Deadlines</h2>
      <input type="text" placeholder="Set Deadline Window" name="deadlineWindow" id="search" onChange={this.setDeadlineWindow}/>
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
              <TableHeaderColumn><h2 id="title">Publication</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Deadlines</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {
            this.props.calls && upcomingDeadlines(this.props.calls, this.state.deadlineWindow).map(deadline => {
              return (
                <TableRow key={deadline.id}>
                  <TableRowColumn><Link to={`/calls/${deadline.id}`}>{deadline.pub.pub_name}</Link></TableRowColumn>
                  <TableRowColumn>{moment(deadline.call_end).format('LL')}</TableRowColumn>
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
  ({ auth, callSearchResults }) => ({ 
  	user: auth,
    calls: callSearchResults
  }), {}
)(DashDeadlines)