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

const AddSub = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.addSub({
      sub_date: moment(evt.target.subDate.value).format('LL'),
      sub_status: evt.target.subStatus.value,
      sub_notes: evt.target.subNotes.value,
      user_id: props.currentUser.id
    });
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
      <h2>New Submission for {`${props.currentUser.name}`}</h2>
      <form onSubmit={onSubmit}>
        <DatePicker hintText="date submission sent" name="subDate" /><br/>
        <h4>Status</h4>
        <select name="subStatus">
          <option value="in process" selected>In Process</option>
          <option value="accepted" selected>Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
        <h4>Notes</h4>
        <textarea type="text" name="subNotes" rows="10" cols="30"/><br/>
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
import {addSub} from '../reducers/oneSub'

export default connect(
  ({ auth, currentUser }) => ({ 
  	user: auth,
    currentUser
  }), {addSub},
)(AddSub)
