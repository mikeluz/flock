import React from 'react'
import {browserHistory} from 'react-router'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import Paper from 'material-ui/Paper';
import {Link} from 'react-router'

const style = {
  height: 'auto',
  width: '100%',
  margin: 'auto',
  textAlign: 'center',
  display: 'inline-block',
  paddingLeft: '40px',
  paddingRight: '40px',
  paddingBottom: '40px',
  paddingTop: '20px',
  backgroundColor: 'rgba(240, 240, 240, 0.8)'
};

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
    browserHistory.push(`/users/${props.currentUser.id}`)
  }

  const saved = () => {
    alert('Saved!');
  }

  const deleteUser = () => {
    var confirm = window.confirm("Are you sure?");
    if (confirm) {
      props.deleteCurrentUser(props.currentUser.id)
      browserHistory.push('/users')
    }
  }

  return (
    <div>
    {props.user 
    ?
    <div id="centerMe">
    <hr/>
      <Paper style={style} zDepth={3}>
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
      </Paper>
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
