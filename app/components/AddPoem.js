import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import {Link} from 'react-router'
var moment = require('moment');

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

const AddPoem = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.addPoem({
      name: evt.target.poemName.value,
      user_id: evt.target.userId.value,
    });
  }

  const saved = evt => {
    alert('Click OK to save new poem');
  }

  console.log("ADD POEM props", props);

  return (
    <div>
    {props.user 
    ?
    <div>{props.user.isAdmin ? <div id="centerMe">
    <hr/>
    <Paper style={style} zDepth={3}>
      <h2>New Poem</h2>
      <form onSubmit={onSubmit}>
        <TextField type="text" hintText="poem name" name="poemName" /><br/>
        <h4>User</h4>
        <select name="userId">
        {
          props.users && props.users.map(user => {
            return (<option value={user.id}>{user.name}</option>)
          })
        }
        </select>
        <br/><br/><br/><br/>
        <div id="button-padding">
        <RaisedButton 
          type="submit"
          label="Save"
          backgroundColor='#000000'
          labelColor='white'
          onClick={saved}
          style={{
            margin: "20px"
          }}
          />
          </div>
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
import {addPoem} from '../reducers/onePoem'

export default connect(
  ({ auth, users }) => ({ 
  	user: auth,
    users: users
  }), {addPoem},
)(AddPoem)
