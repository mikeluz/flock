import React from 'react'
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
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

const AddUser = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.addUser({
      name: evt.target.userName.value,
      email: evt.target.userEmail.value,
      password: evt.target.userPass.value,
      address: evt.target.userAddress.value,
      bio: evt.target.userBio.value
    })
    props.getAllUsers();
    browserHistory.push('/users')
  }

  const saved = evt => {
    alert('Saved!');
  }

  return (
    <div>
    {props.user 
    ?
    <div>{props.user.isAdmin ? <div id="centerMe">
    <hr/>
      <Paper style={style} zDepth={3}>
      <form onSubmit={onSubmit}>
        <h4>Name</h4>
        <TextField type="text" hintText="Name" name="userName" /><br/>
        <h4>Email</h4>
        <TextField type="text" hintText="Email" name="userEmail" /><br/>
        <h4>Password</h4>
        <TextField type="text" hintText="Password" name="userPass" /><br/>
        <h4>Address</h4>
        <TextField type="text" hintText="Address" name="userAddress" /><br/>
        <h4>Bio</h4>
        <TextField type="text" hintText="Bio" name="userBio" /><br/>
        <RaisedButton 
          type="submit"
          label="Save"
          backgroundColor='#000000'
          labelColor='white'
          onClick={saved}
          />
      </form>
      </Paper>
      <br/>
    </div> : <h2>You are trying to access an Admin Only area.</h2>}</div>
    : 
    <h2>Please log in.</h2>}
    </div>
  )
}

import {connect} from 'react-redux'
import {addUser} from 'APP/app/reducers/users/oneUser'
import {getAllUsers} from 'APP/app/reducers/users/users'

export default connect(
  ({ auth, currentUser }) => ({ 
  	user: auth,
    currentUser: currentUser
  }), {addUser, getAllUsers},
)(AddUser)
