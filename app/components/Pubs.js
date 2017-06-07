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
    this.pubSearch = this.pubSearch.bind(this);
  }

  pubSearch(evt) {
    evt.preventDefault();
    this.props.findPubsByName(evt.target.search.value);
  }

  render() {
    
    return (
      <div id="centerMe">
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
              <TableHeaderColumn><h1 id="title">Publications</h1></TableHeaderColumn>
              <TableHeaderColumn>{this.props.user.isAdmin && <div id="centerMeTable"><Link to="/pubs/add"><RaisedButton label="New"/></Link><br/><br/></div>}</TableHeaderColumn>
              <TableHeaderColumn>
                <form method="GET" onSubmit={this.pubSearch}>
                  <input type="text" placeholder="Find Publications" name="search" id="search"/>
                  <RaisedButton 
                    type="submit" 
                    label="Search"        
                    backgroundColor='green'
                    labelColor='white'/>
                </form>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn><h2 id="title">Name</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Web Address</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Submittable Link</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {this.props.searchResults && this.props.searchResults.map(pub => (
            <TableRow key={pub.id}>
              <TableRowColumn><Link to={`/pubs/${pub.id}`}>{pub.pub_name}</Link></TableRowColumn>
              <TableRowColumn><a href={pub.web_address}>{pub.web_address}</a></TableRowColumn>
              <TableRowColumn><a href={pub.submittable_link}>{pub.submittable_link}</a></TableRowColumn>
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
import {findPubsByName} from '../reducers/pubSearchResults'

export default connect(
  ({ auth, allPubs, pubSearchResults }) => ({ 
  	user: auth,
  	pubs: allPubs,
    searchResults: pubSearchResults
  }), {findPubsByName},
)(Pubs)
