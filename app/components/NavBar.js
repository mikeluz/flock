import React from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      searchResults: []
    };

    this.handlePubClick = this.handlePubClick.bind(this);
    this.handleUserClick = this.handleUserClick.bind(this);
    this.handlePoemClick = this.handlePoemClick.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.pubSearch = this.pubSearch.bind(this);
  }

  handlePubClick() {
    // this.props.getAllPubs();
    this.props.findPubsByName('');
  }

  handleUserClick() {
    this.props.getAllUsers();
  }

  handlePoemClick() {
    this.props.getAllPoems();
  }

  pubSearch(evt) {
    evt.preventDefault();
    // this.props.findPubsByName(this.state.searchTerm);
    this.props.findPubsByName(evt.target.search.value);
    // axios.get(`/api/pubs/search/?search=${evt.target.search.value}`)
    //   .then(res => this.setState({
    //     searchResults: res.data
    //   }));
  }

  handleSearch(evt) {
    console.log("evt", evt);
    this.setState({
      searchTerm: evt.target.search.value
    });
  }

  render() {
    console.log("props", this.props);
      return (
      <div>
        <Toolbar style={{
        	backgroundColor: "rgba(0, 0, 0, 0.8)", 
        }}>
      		<ToolbarGroup style={{
          	marginLeft: "auto", 
          	marginRight: "auto"
      		}}>
          {this.props.user.isAdmin && <Link to="/users"><RaisedButton label="Users" onClick={this.handleUserClick}/></Link>}
          {this.props.user.isAdmin && <ToolbarSeparator/>}
          {this.props.user.isAdmin && <Link to="/subs"><RaisedButton label="Submissions"/></Link>}
          {this.props.user.isAdmin && <ToolbarSeparator/>}
          {this.props.user.isAdmin && <Link to="/poems"><RaisedButton label="Poems" onClick={this.handlePoemClick}/></Link>}
          {this.props.user.isAdmin && <ToolbarSeparator/>}
          <Link to="/pubs"><RaisedButton label="Publications" onClick={this.handlePubClick}/></Link>
          <ToolbarSeparator/>
          <Link to="/calls"><RaisedButton label="Calls"/></Link>
          <ToolbarSeparator/>
          <Link to="/flockpad"><RaisedButton label="FlockPad"/></Link>
          <ToolbarSeparator/>
          <form method="GET" onSubmit={this.pubSearch}>
          <input type="text" placeholder="Find Publications" name="search" id="search"/>
          <RaisedButton 
            type="submit" 
            label="Search by Name"        
            backgroundColor='green'
            labelColor='white'/>
          </form>
          {/*<input type="text" placeholder="Find Publications" name="search" id="search" onChange={this.handleSearch}/>
          <RaisedButton 
            type="submit" 
            label="Search by Name"        
            backgroundColor='green'
            labelColor='white'
            onClick={this.pubSearch}/>*/}
      		</ToolbarGroup>
        </Toolbar>
      </div>
      )
  }
}

import {connect} from 'react-redux'
// import {getAllPubs} from '../reducers/allPubs'
import {findPubsByName} from '../reducers/pubSearchResults'
import {getAllUsers} from '../reducers/users'
import {getAllPoems} from '../reducers/allPoems'

export default connect(
  ({ auth, allPubs, pubSearchResults }) => ({ 
    user: auth,
    pubs: allPubs,
    searchResults: pubSearchResults
  }), {getAllUsers, findPubsByName, getAllPoems},
)(NavBar)