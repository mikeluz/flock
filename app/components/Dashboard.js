import React from 'react'
import {Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton';

class Dashboard extends React.Component {

	constructor(props) {
		super(props)

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.props.getAllPubs();
	}

	render() {
		return (
		  <div>
		   {this.props.user && 
		   <div>
		   <h1>Welcome back, {this.props.user.name}</h1>
		   <Link to="/pubs"><RaisedButton label="Publications" onClick={this.handleClick}/></Link>
		   </div>
		 	 }

		  </div>
		)
	}
}

import {connect} from 'react-redux'
import {getAllPubs} from '../reducers/allPubs'

export default connect(
  ({ auth, allPubs }) => ({ 
  	user: auth,
  	pubs: allPubs 
  }), {getAllPubs},
)(Dashboard)