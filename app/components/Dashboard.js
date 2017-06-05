import React from 'react'
import {Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Pubs from './Pubs'

class Dashboard extends React.Component {

	constructor(props) {
		super(props)
	}

  render() {
		return (
		  <div id="centerMe">
		   {this.props.user && 
		   <div>
		   <h2>Welcome back, {this.props.user.name.split(" ")[0]}</h2>
		   </div>
		 	 }
		 	 {
		 	 	this.props.searchResults &&
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
          {this.props.searchResults && this.props.searchResults.map(pub => (
            <TableRow key={pub.id}>
              <TableRowColumn><Link to={`/pubs/${pub.id}`}>{pub.pub_name}</Link></TableRowColumn>
              <TableRowColumn><a href={pub.web_address}>{pub.web_address}</a></TableRowColumn>
              <TableRowColumn><a href={pub.submittable_link}>{pub.submittable_link}</a></TableRowColumn>
            </TableRow>)
          )}
          </TableBody>
        </Table>
		 	 }
		  </div>
		)
	}
}

import {connect} from 'react-redux'
import {getAllPubs} from '../reducers/allPubs'

export default connect(
  ({ auth, allPubs, pubSearchResults }) => ({ 
  	user: auth,
  	pubs: allPubs,
  	searchResults: pubSearchResults
  }), {getAllPubs},
)(Dashboard)