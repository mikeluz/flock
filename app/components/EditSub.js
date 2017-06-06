import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'
import SelectField from 'material-ui/SelectField';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
var moment = require('moment');

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

const EditSub = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.updateCurrentSub({
      id: props.currentSub.id,
      sub_date: evt.target.subDate.value ? moment(evt.target.subDate.value).format('LL') : moment(props.currentSub.sub_date).format('LL'),
      sub_status: evt.target.subStatus.value,
      sub_notes: evt.target.subNotes.value,
    });
  }

  const saved = () => {
    alert('Click OK to update submission');
  }

  let date = props.currentSub ? moment(props.currentSub.sub_date).format('LL') : "NA"
  let subUser = props.currentSub.user ? props.currentSub.user.name : null

  return (
    <div>
    {props.user 
    ?
    <div>{props.user.isAdmin ? <div id="centerMe">
    <hr/>
    <Paper style={style} zDepth={3}>
      <h2>{subUser ? <div>Edit Submission for {subUser}</div> : "Updated!"}</h2>
      <form onSubmit={onSubmit}>
        <h4>Date Submitted: {date}</h4>
        <DatePicker hintText="date submitted" name="subDate" /><br/>
        <h4>Status</h4>
        <select name="subStatus" defaultValue={props.currentSub.sub_status}>
          <option value="in process" selected>In Process</option>
          <option value="accepted" selected>Accepted</option>
          <option value="rejected">Rejected</option>
          <option value="withdrawn">Withdrawn</option>
        </select>
        <h4>Notes</h4>
        <textarea type="text" name="subNotes" rows="10" cols="30" defaultValue={props.currentSub.sub_notes} /><br/>
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
import {updateCurrentSub} from '../reducers/oneSub'

export default connect(
  ({ auth, currentSub }) => ({ 
  	user: auth,
    currentSub: currentSub
  }), {updateCurrentSub},
)(EditSub)
