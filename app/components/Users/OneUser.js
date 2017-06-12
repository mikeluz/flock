import React from 'react'
import axios from 'axios'
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

const OneUser = (props) => {

  const setNewSubUser = (user) => {
    axios.post('/api/subs/new/user', user)
      .then(res => {
        console.log("res.config.data", res.config.data);
      })
  } 

  const setNewSubUserHandler = () => {
    setNewSubUser(props.currentUser);
  }

  let currentUserId = props.currentUser ? props.currentUser.id : 0;
  
  return (
  <div>
  {props.user 
  ?
  <div id="centerMe">
  <hr/>
  <Paper style={style} zDepth={3}>
  <h4>Name</h4>
  <h2>{props.currentUser ? props.currentUser.name : "No selection was made."}</h2>
  <h4>Email</h4>
  <h2>{props.currentUser ? props.currentUser.email : "No selection was made."}</h2>
  <h4>Address</h4>
  <h2>{props.currentUser ? props.currentUser.address : "No selection was made."}</h2>
  <h4>Bio</h4>
  <p id="bio">{props.currentUser ? props.currentUser.bio : "No selection was made."}</p>
  <br/>
  {props.user.isAdmin && <div> 
    <Link to={`/users/${currentUserId}/edit`}>
    <RaisedButton type="submit" label="Edit" backgroundColor='#000000' labelColor='white' />
    </Link>
    <Link to={`/subs/add`}>
    <RaisedButton type="submit" label="New Submission" backgroundColor='white' labelColor='black' onClick={setNewSubUserHandler} />
    </Link></div>
  }
  </Paper>
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
