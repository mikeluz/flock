import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

const OnePub = (props) => {

  let currentPubId = props.currentPub ? props.currentPub.id : 0;
  
  return (
  <div>
  {props.user 
  ?
  <div id="centerMe">
  <hr/>
  <h4>Publication Name</h4>
  <h2>{props.currentPub ? props.currentPub.pub_name : "No selection was made."}</h2>
  <h4>Editor Email</h4>
  <h2>{props.currentPub ? props.currentPub.editor_email : "No selection was made."}</h2>
  <h4>Web Address</h4>
  <h2>{props.currentPub ? props.currentPub.web_address : "No selection was made."}</h2>
  <h4>Submittable Link</h4>
  <h2>{props.currentPub ? props.currentPub.submittable_link : "No selection was made."}</h2>
  {props.user.isAdmin && 
    <Link to={`/pubs/${currentPubId}/edit`}>
    <RaisedButton type="submit" label="Edit" backgroundColor='#000000' labelColor='white' />
    </Link>}
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
