import React from 'react'
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
  
    this.loadPub = this.loadPub.bind(this);
  }

  loadPub(e) {
    // console.log("e", e);
    // this.props.getCurrentPub(e.target.value);
  }

  render() {
    return (
      <div>
       {/*user ? <div>{user.isAdmin ? <h1>PUBLICATIONS</h1> : <h2>You are trying to access an Admin Only area.</h2>}</div> : <h2>Please log in.</h2>*/}
      {this.props.user ?
      <div id="centerMe">
      <h1>Publications</h1>{this.props.user.isAdmin && <Link to="/pubs/add"><RaisedButton label="Add"/></Link>}
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
      </Table></div> : <h2>Please log in.</h2>}
      </div>
    )
  }

}

import {connect} from 'react-redux'
import {getCurrentPub} from '../reducers/onePub'

export default connect(
  ({ auth, allPubs }) => ({ 
  	user: auth,
  	pubs: allPubs
  }), {getCurrentPub},
)(Pubs)
