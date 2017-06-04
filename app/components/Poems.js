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

class Poems extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      searchResults: []
    }
  
    this.poemSearch = this.poemSearch.bind(this);
  }

  poemSearch(evt) {
    evt.preventDefault();
    axios.get(`/api/poems/search/?search=${evt.target.search.value}`)
      .then(res => this.setState({
        searchResults: res.data
      }));
  }

  render() {
    console.log("poems props", this.props)
    return (
      <div id="centerMe">
       {/*user ? <div>{user.isAdmin ? <h1>PUBLICATIONS</h1> : <h2>You are trying to access an Admin Only area.</h2>}</div> : <h2>Please log in.</h2>*/}
      {this.props.user ?
      <div>
      <h2>Poems</h2>{this.props.user.isAdmin && <div><Link to="/poems/add"><RaisedButton label="Add"/></Link><br/><br/></div>}
      <form method="GET" onSubmit={this.poemSearch}>
        <input type="text" name="search" />
        <button type="submit">Find Poem</button>
      </form>
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
              <TableHeaderColumn><h2 id="title">Title</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Author</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {this.props.searchResults && this.props.searchResults.map(pub => (
            <TableRow key={poem.id}>
              <TableRowColumn><Link to={`/poems/${poem.id}`}>{poem.name}</Link></TableRowColumn>
              <TableRowColumn><Link to={`/users/${poem.user_id}`}>{poem.user_id}</Link></TableRowColumn>
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
              <TableHeaderColumn><h2 id="title">Title</h2></TableHeaderColumn>
      	      <TableHeaderColumn><h2 id="title">Author</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
      	  {this.props.poems && this.props.poems.map(poem => (
            <TableRow key={poem.id}>
              <TableRowColumn><Link to={`/poems/${poem.id}`}>{poem.name}</Link></TableRowColumn>
              <TableRowColumn><Link to={`/users/${poem.user_id}`}>{poem.user_id}</Link></TableRowColumn>
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
  ({ auth, allPoems, poemSearchResults }) => ({ 
  	user: auth,
  	poems: allPoems,
    searchResults: poemSearchResults
  }), {getCurrentPub},
)(Poems)