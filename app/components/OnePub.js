import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';
import {Link} from 'react-router'

const style = {
  height: 'auto',
  width: 'auto',
  margin: 'auto',
  textAlign: 'center',
  display: 'inline-block',
  paddingLeft: '40px',
  paddingRight: '40px',
  paddingBottom: '40px',
  paddingTop: '20px',
  backgroundColor: 'rgba(240, 240, 240, 0.8)'
};

const OnePub = (props) => {

  let currentPubId = props.currentPub ? props.currentPub.id : 0;
  
  return (
  <div id="centerMe">
  {props.user 
  ?
  <div>
  <hr/>
  <Paper style={style} zDepth={3}>
  <h4>Publication Name</h4>
  <h2>{props.currentPub ? props.currentPub.pub_name : "No selection was made."}</h2>
  <h4>Editor Email</h4>
  <h2>{props.currentPub ? props.currentPub.editor_email : "No selection was made."}</h2>
  <h4>Web Address</h4>
  <h2>{props.currentPub ? props.currentPub.web_address : "No selection was made."}</h2>
  <h4>Submittable Link</h4>
  <h2>{props.currentPub ? props.currentPub.submittable_link : "No selection was made."}</h2>
  {props.user.isAdmin && <div>
    <Link to={`/pubs/${currentPubId}/edit`}>
    <RaisedButton type="submit" label="Edit" backgroundColor='#000000' labelColor='white' />
    </Link>
    <Link to={`/calls/add`}>
    <RaisedButton type="submit" label="Add Call" backgroundColor='white' labelColor='black' />
    </Link></div>}
  </Paper>
  </div>
  : 
  <h2>Please log in.</h2>}
  </div>
)}

import {connect} from 'react-redux'

export default connect(
  ({ auth, currentPub }) => ({ 
  	user: auth,
    currentPub: currentPub
  }), {},
)(OnePub)