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

class Pubs extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    }
  
    this.pubSearch = this.pubSearch.bind(this);
  }

  pubSearch(evt) {
    evt.preventDefault();
    axios.get(`/api/pubs/search/?search=${evt.target.search.value}`)
      .then(res => this.setState({
        searchResults: res.data
      }));
  }

  render() {
    console.log("pubs props", this.props)
    return (
      <div id="centerMe">
       {/*user ? <div>{user.isAdmin ? <h1>PUBLICATIONS</h1> : <h2>You are trying to access an Admin Only area.</h2>}</div> : <h2>Please log in.</h2>*/}
      {this.props.user ?
      <div>
      <h1>Publications</h1>{this.props.user.isAdmin && <div><Link to="/pubs/add"><RaisedButton label="Add"/></Link><br/><br/></div>}
      <form method="GET" onSubmit={this.pubSearch}>
        <input type="text" name="search" />
        <button type="submit">Search</button>
      </form>
      <br/>
      <div>
      {
        this.state.searchResults.length >= 1
        ?
        <div>
        <h1>Search Results</h1>
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
              <TableHeaderColumn><h2 id="title">Web Address</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Submittable Link</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {this.state.searchResults && this.state.searchResults.map(pub => (
            <TableRow key={pub.id}>
              <TableRowColumn><Link to={`/pubs/${pub.id}`}>{pub.pub_name}</Link></TableRowColumn>
              <TableRowColumn><a href={pub.web_address}>{pub.web_address}</a></TableRowColumn>
              <TableRowColumn><a href={pub.submittable_link}>{pub.submittable_link}</a></TableRowColumn>
            </TableRow>)
          )}
          </TableBody>
        </Table>
        </div>
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
              <TableHeaderColumn><h2 id="title">Name</h2></TableHeaderColumn>
      	      <TableHeaderColumn><h2 id="title">Web Address</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Submittable Link</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
      	  {this.props.pubs && this.props.pubs.map(pub => (
            <TableRow key={pub.id}>
              <TableRowColumn><Link to={`/pubs/${pub.id}`}>{pub.pub_name}</Link></TableRowColumn>
              <TableRowColumn><a href={pub.web_address}>{pub.web_address}</a></TableRowColumn>
              <TableRowColumn><a href={pub.submittable_link}>{pub.submittable_link}</a></TableRowColumn>
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
import {getCurrentPub} from '../reducers/onePub'

export default connect(
  ({ auth, allPubs, pubSearchResults }) => ({ 
  	user: auth,
  	pubs: allPubs,
    searchResults: pubSearchResults
  }), {getCurrentPub},
)(Pubs)
