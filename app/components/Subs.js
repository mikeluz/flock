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
    this.subSearch = this.subSearch.bind(this);
  }

  subSearch(evt) {
    evt.preventDefault();
    this.props.findSubsByUserName(evt.target.search.value);
  }

  render() {
    return (
      <div id="centerMe">
      {this.props.user ?
      <div>
      <br/>
      <div>
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
              <TableHeaderColumn><h1 id="title">Submissions</h1><div>{this.props.searchResults && this.props.countOfResults(this.props.searchResults)}</div></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
              <TableHeaderColumn><div>      
                <form method="GET" onSubmit={this.subSearch}>
                <input type="text" placeholder="Find Submissions" name="search" id="search" />
                  <RaisedButton 
                    type="submit" 
                    label="Find Submissions"        
                    backgroundColor='green'
                    labelColor='white'/>
                </form></div>
              </TableHeaderColumn>
              <TableHeaderColumn></TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn><h2 id="title">Submission</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">User</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Date Sent</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Status</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Publication</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Call</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {this.props.searchResults && this.props.searchResults.map(sub => (
            <TableRow key={sub.id}>
              <TableRowColumn><Link to={`/subs/${sub.id}`}>{sub.id}</Link></TableRowColumn>
              <TableRowColumn><Link to={`/users/${sub.user.id}`}>{sub.user.name}</Link></TableRowColumn>
              <TableRowColumn>{moment(sub.sub_date).format('LL')}</TableRowColumn>
              <TableRowColumn>{sub.sub_status}</TableRowColumn>
              <TableRowColumn>{sub.pub && <Link to={`/pubs/${sub.pub.id}`}>{sub.pub.pub_name}</Link>}</TableRowColumn>
              <TableRowColumn>{sub.call && <Link to={`/calls/${sub.call.id}`}>{sub.call.call_name}</Link>}</TableRowColumn>
            </TableRow>)
          )}
          </TableBody>
        </Table>
      </div></div> : <h2>Please log in.</h2>}
      </div>
    )
  }
}

import {connect} from 'react-redux'
import {findSubsByUserName} from '../reducers/subSearchResults'
import countOfResults from '../utils/countOfResults'

export default connect(
  ({ auth, allSubs, subSearchResults }) => ({ 
  	user: auth,
  	subs: allSubs,
    searchResults: subSearchResults
  }), {findSubsByUserName, countOfResults},
)(Subs)
