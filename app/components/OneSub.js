import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper'
import {Link} from 'react-router'
var moment = require('moment')

const style = {
  height: 'auto',
  width: '80%',
  margin: 'auto',
  textAlign: 'center',
  display: 'inline-block',
  paddingLeft: '40px',
  paddingRight: '40px',
  paddingBottom: '40px',
  paddingTop: '20px',
  backgroundColor: 'rgba(240, 240, 240, 0.8)'
};

const OneSub = (props) => {


  const deleteSub = () => {
    var confirm = window.confirm("Are you sure?");
    if (confirm) {
      props.deleteCurrentSub(props.currentSub.id)
      browserHistory.push('/dashboard')
    }
  }

  let currentSubId = props.currentSub ? props.currentSub.id : 0
  let date = props.currentSub ? moment(props.currentSub.sub_date).format('LL') : "NA"
  
  return (
  <div id="centerMe">
  {props.user 
  ?
  <div>
  <hr/>
  <Paper style={style} zDepth={3}>
  <h4>Date Submitted</h4>
  <h2>{props.currentSub ? date : "No selection was made."}</h2>
  <h4>Status</h4>
  <h2>{props.currentSub ? props.currentSub.sub_status : "No selection was made."}</h2>
  <h4>Notes</h4>
  <h2>{props.currentSub ? props.currentSub.sub_notes : "No selection was made."}</h2>
  <h4>User</h4>
  <h2>{props.currentSub ? <div>{props.currentSub.user ? props.currentSub.user.name : "No User Assigned"}</div> : "No selection was made."}</h2>
  <h4>Publication</h4>
  <h2>{props.currentSub ? <div>{props.currentSub.pub ? props.currentSub.pub.pub_name : "No Publication Assigned"}</div> : "No selection was made."}</h2> 
  <h4>Call</h4>
  <h2>{props.currentSub ? <div>{props.currentSub.call ? props.currentSub.call.call_name : "No Call Assigned"}</div> : "No selection was made."}</h2>
  <h4>Poems</h4>
  {props.currentSub ? (props.currentSub.poems ? props.currentSub.poems.map(poem => <h2 key={poem.id}>{poem.name}</h2>) : <h2>No Poems Assigned</h2>) : "No selection was made."}
  {props.user.isAdmin && <div>
    <Link to={`/subs/${currentSubId}/edit`}>
    <RaisedButton label="Delete" onClick={deleteSub}/>
    <RaisedButton type="submit" label="Edit" backgroundColor='#000000' labelColor='white' /><br/><br/>
    </Link>
  </div>}
  </Paper>
  </div>
  : 
  <h2>Please log in.</h2>}
  </div>
)}

import {connect} from 'react-redux'
import {deleteCurrentSub} from '../reducers/oneSub'

export default connect(
  ({ auth, currentSub }) => ({ 
  	user: auth,
    currentSub: currentSub
  }), {deleteCurrentSub},
)(OneSub)