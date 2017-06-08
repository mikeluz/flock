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
    this.poemSearch = this.poemSearch.bind(this);
  }

  componentDidMount() {
    if (!this.props.poems) {
      this.props.getAllPoems();
    }
  }

  poemSearch(evt) {
    evt.preventDefault();
    this.props.findPoemsByName(evt.target.search.value);
  }

  render() {
    console.log("poems props", this.props)
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
              <TableHeaderColumn><h1 id="title">Poems</h1></TableHeaderColumn>
              <TableHeaderColumn>{this.props.user.isAdmin && <div id="centerMeTable"><Link to="/poems/add"><RaisedButton label="New"/></Link><br/><br/></div>}</TableHeaderColumn>
              <TableHeaderColumn>
                <form method="GET" onSubmit={this.poemSearch}>
                <input type="text" placeholder="Find Poems" name="search" id="search" />
                  <RaisedButton 
                    type="submit" 
                    label="Find Poems"        
                    backgroundColor='green'
                    labelColor='white'/>
                </form>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn><h2 id="title">Title</h2></TableHeaderColumn>
              <TableHeaderColumn><h2 id="title">Author</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
          {this.props.searchResults && this.props.searchResults.map(poem => (
            <TableRow key={poem.id}>
              <TableRowColumn><Link to={`/poems/${poem.id}`}>{poem.name}</Link></TableRowColumn>
              <TableRowColumn><Link to={`/users/${poem.user_id}`}>{poem.user.name}</Link></TableRowColumn>
              <TableRowColumn></TableRowColumn>
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
              <TableHeaderColumn><h1 id="title">Poems</h1></TableHeaderColumn>
              <TableHeaderColumn>{this.props.user.isAdmin && <div id="centerMeTable"><Link to="/poems/add"><RaisedButton label="New"/></Link><br/><br/></div>}</TableHeaderColumn>
              <TableHeaderColumn>
                <form method="GET" onSubmit={this.poemSearch}>
                <input type="text" placeholder="Find Poems" name="search" id="search" />
                  <RaisedButton 
                    type="submit" 
                    label="Find Poems"        
                    backgroundColor='green'
                    labelColor='white'/>
                </form>
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn><h2 id="title">Title</h2></TableHeaderColumn>
      	      <TableHeaderColumn><h2 id="title">Author</h2></TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
      	  {this.props.poems && this.props.poems.map(poem => (
            <TableRow key={poem.id}>
              <TableRowColumn><Link to={`/poems/${poem.id}`}>{poem.name}</Link></TableRowColumn>
              <TableRowColumn><Link to={`/users/${poem.user_id}`}>{poem.user.name}</Link></TableRowColumn>
              <TableRowColumn></TableRowColumn>
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
import {findPoemsByName} from '../reducers/poemSearchResults'
import {getAllPoems} from '../reducers/allPoems'

export default connect(
  ({ auth, allPoems, poemSearchResults }) => ({ 
  	user: auth,
  	poems: allPoems,
    searchResults: poemSearchResults
  }), {findPoemsByName, getAllPoems},
)(Poems)
