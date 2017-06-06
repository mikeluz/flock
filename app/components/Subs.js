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

class Subs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    }
  
    this.subSearch = this.subSearch.bind(this);
  }

  subSearch(evt) {
    evt.preventDefault();
    axios.get(`/api/subs/search/?search=${evt.target.search.value}`)
      .then(res => this.setState({
        searchResults: res.data
      }));
  }

  render() {
    console.log("subs props", this.props)
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
              <TableHeaderColumn><h1 id="title">Submissions</h1></TableHeaderColumn>
              <TableHeaderColumn><div>      
                <form method="GET" onSubmit={this.subSearch}>
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
          {this.props.searchResults && this.props.searchResults.map(sub => (
            <TableRow key={sub.id}>
              <TableRowColumn><Link to={`/subs/${sub.id}`}>{sub.sub_name}</Link></TableRowColumn>
              <TableRowColumn><Link to={`/pubs/${sub.pub.id}`}>{sub.pub.pub_name}</Link></TableRowColumn>
              <TableRowColumn>{moment(sub.sub_start).format('LL')}</TableRowColumn>
              <TableRowColumn>{moment(sub.sub_end).format('LL')}</TableRowColumn>
              <TableRowColumn>{sub.open_or_closed}</TableRowColumn>
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
              <TableHeaderColumn><h1 id="title">Submissions</h1></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn><div>      
                <form method="GET" onSubmit={this.subSearch}>
                <input type="text" name="search" />
                <button type="submit">Find</button>
                </form></div>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn><h2 id="title">Submission</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">User</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Date Sent</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Status</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Notes</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Publication</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Call</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
      	  {this.props.subs && this.props.subs.map(sub => (
            <TableRow key={sub.id}>
              <TableRowColumn><Link to={`/subs/${sub.id}`}>{sub.id}</Link></TableRowColumn>
              <TableRowColumn><Link to={`/users/${sub.user.id}`}>{sub.user.name}</Link></TableRowColumn>
              <TableRowColumn>{moment(sub.sub_date).format('LL')}</TableRowColumn>
              <TableRowColumn>{sub.sub_status}</TableRowColumn>
              <TableRowColumn>{sub.sub_notes}</TableRowColumn>
              <TableRowColumn>{sub.pub_name}</TableRowColumn>
              <TableRowColumn>{sub.call && <Link to={`/calls/${sub.call.id}`}>{sub.call.call_name}</Link>}</TableRowColumn>
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
  ({ auth, allSubs, subSearchResults }) => ({ 
  	user: auth,
  	subs: allSubs,
    searchResults: subSearchResults
  }), {},
)(Subs)
