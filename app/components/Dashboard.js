import React from 'react'
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
		   {this.props.user && <h1>Welcome back, {this.props.user.name}</h1>}
		   <RaisedButton label="Publications" onClick={this.handleClick}/>

		  </div>
		)
	}
}

import {connect} from 'react-redux'
import {getAllPubs} from '../reducers/allPubs'

export default connect(
  ({ auth }) => ({ user: auth }),
  {getAllPubs},
)(Dashboard)