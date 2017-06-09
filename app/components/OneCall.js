import React from 'react'
import {browserHistory} from 'react-router'
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

const OneCall = (props) => {

  const deleteCall = () => {
    var confirm = window.confirm("Are you sure?");
    if (confirm) {
      props.deleteCurrentCall(props.currentCall.id)
      browserHistory.push('/dashboard')
    }
  }

  const addCurrentSub = () => {
    var confirm = window.confirm("Are you sure?");
    if (confirm) {
      props.addCurrentSub(props.currentCall.id)
      browserHistory.push('/poems')
    }
  }

  let currentCallId = props.currentCall ? props.currentCall.id : 0
  let start = props.currentCall ? moment(props.currentCall.call_start).format('LL') : "NA"
  let end = props.currentCall ? moment(props.currentCall.call_end).format('LL') : "NA"
  
  return (
  <div id="centerMe">
  {props.user 
  ?
  <div>
  <br/>
  <Paper style={style} zDepth={3}>
  <div id="form-left">
  <h4>Call Name</h4>
  <h2>{props.currentCall ? props.currentCall.call_name : "No selection was made."}</h2>
  <h4>Call Start</h4>
  <h2>{props.currentCall ? start : "No selection was made."}</h2>
  <h4>Call End</h4>
  <h2>{props.currentCall ? end : "No selection was made."}</h2>
  <h4>Call Type</h4>
  <h2>{props.currentCall ? props.currentCall.call_type : "No selection was made."}</h2>
  <h4>Call Judge</h4>
  <h2>{props.currentCall ? props.currentCall.call_judge : "No selection was made."}</h2>
  </div>
  <div id="form-center">
  <h4>Open or Closed</h4>
  <h2>{props.currentCall ? props.currentCall.open_or_closed : "No selection was made."}</h2>
  <h4>Call Detail</h4>
  <h2>{props.currentCall ? props.currentCall.call_detail : "No selection was made."}</h2>
  </div>
  <div id="form-right">
  <h4>Pages Or Poems</h4>
  <h2>{props.currentCall ? props.currentCall.pages_or_poems : "No selection was made."}</h2>
  <h4>Required Length</h4>
  <h2>{props.currentCall ? props.currentCall.req_length : "No selection was made."}</h2> 
  <h4>Mail Only</h4>
  <h2>{props.currentCall ? (props.currentCall.mail_only ? "Yes" : "No") : "No selection was made."}</h2>
  <h4>SASE Required</h4>
  <h2>{props.currentCall ? (props.currentCall.req_sase ? "Yes" : "No") : "No selection was made."}</h2>
  <h4>Mailing Address</h4>
  <h2>{props.currentCall ? props.currentCall.mailing_address : "No selection was made."}</h2> 
  </div>
  {props.user.isAdmin && <div>
    <RaisedButton label="Delete" onClick={deleteCall}/>
    <Link to={`/calls/${currentCallId}/edit`}>
    <RaisedButton type="submit" label="Edit" backgroundColor='#000000' labelColor='white' /><br/><br/>
    </Link>
    <RaisedButton label="Add Current Sub" onClick={addCurrentSub}/>
  </div>}
  </Paper>
  </div>
  : 
  <h2>Please log in.</h2>}
  </div>
)}

import {connect} from 'react-redux'
import {deleteCurrentCall} from '../reducers/oneCall'
import {addCurrentSub} from '../reducers/oneSub'

export default connect(
  ({ auth, currentCall }) => ({ 
  	user: auth,
    currentCall: currentCall
  }), {deleteCurrentCall, addCurrentSub},
)(OneCall)