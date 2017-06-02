import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

const OneUser = (props) => {

  let currentUserId = props.currentUser ? props.currentUser.id : 0;
  
  return (
  <div>
  {props.user 
  ?
  <div id="centerMe">
  <hr/>
  <h4>Name</h4>
  <h2>{props.currentUser ? props.currentUser.name : "No selection was made."}</h2>
  <h4>Email</h4>
  <h2>{props.currentUser ? props.currentUser.email : "No selection was made."}</h2>
  <h4>Address</h4>
  <h2>{props.currentUser ? props.currentUser.address : "No selection was made."}</h2>
  <h4>Bio</h4>
  <h2>{props.currentUser ? props.currentUser.bio : "No selection was made."}</h2>
  {props.user.isAdmin && 
    <Link to={`/users/${currentUserId}/edit`}>
    <RaisedButton type="submit" label="Edit" backgroundColor='#000000' labelColor='white' />
    </Link>}
  </div>
  : 
  <h2>Please log in.</h2>}
  </div>
)}

import {connect} from 'react-redux'

export default connect(
  ({ auth, currentUser }) => ({ 
  	user: auth,
    currentUser: currentUser
  }), {},
)(OneUser)
