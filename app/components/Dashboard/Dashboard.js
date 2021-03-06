import React from 'react'
import {Link} from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table'
import Pubs from '../Pubs/Pubs'
import Chart from 'chart.js'
import DashPie from './DashPie'
import DashDeadlines from './DashDeadlines'
import DashSubs from './DashSubs'

const style = {
  height: 'auto',
  width: '100%',
  margin: 'auto',
  display: 'inline-block',
  paddingLeft: '40px',
  paddingRight: '40px',
  paddingBottom: '40px',
  paddingTop: '20px',
  backgroundColor: 'rgba(240, 240, 240, 0.8)'
};

class Dashboard extends React.Component {

	constructor(props) {
		super(props)
	}

  componentWillReceiveProps() {
    if (this.props.user) {
      this.props.findCallsByName('');
    }
  }

  componentDidUpdate() {
    if (this.props.user) {
      this.props.findCallsByName('');
      this.props.getUserSubs(this.props.user.id);
    }
  }

  render() {
		return (
		  <div>
      <br/>
       <div>
       {this.props.user && 
       <Paper style={style} zDepth={3}>
       <h2 id='centerMe'>Welcome back, {this.props.user && this.props.user.name.split(" ")[0]}</h2>
       <hr/>
       <div id="inline"><DashDeadlines /><DashPie /><DashSubs /></div>
       </Paper>
       }
		   </div>
		  </div>
		)
	}
}

import {connect} from 'react-redux'
import {getUserSubs} from 'APP/app/reducers/users/userSubs'
import {findCallsByName} from 'APP/app/reducers/calls/callSearchResults'

export default connect(
  ({ auth }) => ({ 
  	user: auth
  }), {getUserSubs, findCallsByName},
)(Dashboard)