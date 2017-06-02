import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

const EditUser = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.updateCurrentUser({
      id: props.currentUser.id,
      name: evt.target.userName.value,
      email: evt.target.userEmail.value,
      address: evt.target.userAddress.value,
      bio: evt.target.userBio.value
    });
  }

  const saved = () => {
    alert('Saved!');
  }

  const deleteUser = () => {
    var confirm = window.confirm("Are you sure?");
    if (confirm) {
      props.deleteCurrentUser(props.currentUser.id)
    }
  }

  return (
    <div>
    {props.user 
    ?
    <div id="centerMe">
    <hr/>
      <form onSubmit={onSubmit}>
        <h4>Name</h4>
        <TextField type="text" hintText="Name" name="userName" defaultValue={props.currentUser.name}/><br/>
        <h4>Email</h4>
        <TextField type="text" hintText="Email" name="userEmail" defaultValue={props.currentUser.email}/><br/>
        <h4>Address</h4>
        <TextField type="text" hintText="Address" name="userAddress" defaultValue={props.currentUser.address}/><br/>
        <h4>Bio</h4>
        <textarea type="text" name="userBio" defaultValue={props.currentUser.bio} rows="20" cols="50"/><br/>
        <br/>
        <RaisedButton label="Delete" onClick={deleteUser}/>
        <RaisedButton 
          type="submit"
          label="Save"
          backgroundColor='#000000'
          labelColor='white'
          onClick={saved}
          />
          <Link to={`/users/${props.currentUser.id}`}><RaisedButton label="View"/></Link>
      </form>
    </div>
    : 
    <h2 id="centerMe">Please log in.</h2>}
    </div>
  )
}

import {connect} from 'react-redux'
import {updateCurrentUser, deleteCurrentUser} from '../reducers/oneUser'

export default connect(
  ({ auth, currentUser }) => ({ 
  	user: auth,
    currentUser: currentUser
  }), {updateCurrentUser, deleteCurrentUser},
)(EditUser)
