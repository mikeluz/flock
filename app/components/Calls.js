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
} from 'material-ui/Table';
import {RaisedButton} from 'material-ui'
var moment = require('moment');

class Calls extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    }
  
    this.callSearch = this.callSearch.bind(this);
  }

  callSearch(evt) {
    evt.preventDefault();
    axios.get(`/api/calls/search/?search=${evt.target.search.value}`)
      .then(res => this.setState({
        searchResults: res.data
      }));
  }

  render() {
    console.log("calls props", this.props)
    return (
      <div id="centerMe">
       {/*user ? <div>{user.isAdmin ? <h1>PUBLICATIONS</h1> : <h2>You are trying to access an Admin Only area.</h2>}</div> : <h2>Please log in.</h2>*/}
      {this.props.user ?
      <div>
      <br/>
      <div>
      {
        this.props.searchResults
        ?
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
              <TableHeaderColumn><h1 id="title">Calls</h1></TableHeaderColumn>
              <TableHeaderColumn><div>      
                <form method="GET" onSubmit={this.callSearch}>
                <input type="text" name="search" />
                <button type="submit">Search</button>
                </form></div>
              </TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn><h2 id="title">Name</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Pub</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Date Start</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Date End</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Open or Closed</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {this.props.searchResults && this.props.searchResults.map(call => (
            <TableRow key={call.id}>
              <TableRowColumn><Link to={`/calls/${call.id}`}>{call.call_name}</Link></TableRowColumn>
              <TableRowColumn><Link to={`/pubs/${call.pub.id}`}>{call.pub.pub_name}</Link></TableRowColumn>
              <TableRowColumn>{moment(call.call_start).format('LL')}</TableRowColumn>
              <TableRowColumn>{moment(call.call_end).format('LL')}</TableRowColumn>
              <TableRowColumn>{call.open_or_closed}</TableRowColumn>
            </TableRow>)
          )}
          </TableBody>
        </Table>
        :
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
              <TableHeaderColumn><h1 id="title">Calls</h1></TableHeaderColumn>
              <TableHeaderColumn><div>      
                <form method="GET" onSubmit={this.callSearch}>
                <input type="text" name="search" />
                <button type="submit">Search</button>
                </form></div>
              </TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn><h2 id="title">Name</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Pub</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Date Start</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Date End</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Open or Closed</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
      	  {this.props.calls && this.props.calls.map(call => (
            <TableRow key={call.id}>
              <TableRowColumn><Link to={`/calls/${call.id}`}>{call.call_name}</Link></TableRowColumn>
              <TableRowColumn><Link to={`/pubs/${call.pub.id}`}>{call.pub.pub_name}</Link></TableRowColumn>
              <TableRowColumn>{moment(call.call_start).format('LL')}</TableRowColumn>
              <TableRowColumn>{moment(call.call_end).format('LL')}</TableRowColumn>
              <TableRowColumn>{call.open_or_closed}</TableRowColumn>
            </TableRow>)
      	  )}
          </TableBody>
        </Table>
      }</div></div> : <h2>Please log in.</h2>}
      </div>
    )
  }

}

import {connect} from 'react-redux'

export default connect(
  ({ auth, allCalls, callSearchResults }) => ({ 
  	user: auth,
  	calls: allCalls,
    searchResults: callSearchResults
  }), {},
)(Calls)
