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

const EditCall = (props) => { 

  const onSubmit = evt => {
    console.log("callDetails", evt.target.callDetails.value);
    evt.preventDefault();
    props.updateCurrentCall({
      id: props.currentCall.id,
      call_name: evt.target.callName.value,
      call_start: (evt.target.callStart.value.length > 0 ? moment(evt.target.callStart.value).format('LL') : props.currentCall.call_start),
      call_end: (evt.target.callEnd.value.length > 0 ? moment(evt.target.callEnd.value).format('LL') : props.currentCall.call_end),
      call_judge: evt.target.callJudge.value,
      open_or_closed: evt.target.openOrClosed.value,
      call_detail: evt.target.callDetails.value,
      pages_or_poems: evt.target.pagesOrPoems.value,
      req_length: evt.target.reqLength.value,
      mail_only: evt.target.mailOnly.value,
      req_sase: evt.target.reqSase.value,
      mailing_address: evt.target.mailingAddress.value
    });
  }

  const saved = () => {
    alert('Saved!');
  }

  const deleteCall = () => {
    var confirm = window.confirm("Are you sure?");
    if (confirm) {
      props.deleteCurrentCall(props.currentCall.id)
    }
  }

  let start = props.currentCall ? moment(props.currentCall.call_start).format('LL') : "NA"
  let end = props.currentCall ? moment(props.currentCall.call_end).format('LL') : "NA"

  return (
    <div>
    {props.user 
    ?
    <div>{props.user.isAdmin ? <div id="centerMe">
    <hr/>
    <Paper style={style} zDepth={3}>
      <h2>Edit Call for {props.currentCall.pub.pub_name}</h2>
      <form onSubmit={onSubmit}>
        <div id="form-left">
        <h4>Call Name</h4>
        <TextField type="text" hintText="call name" name="callName" defaultValue={props.currentCall.call_name} /><br/>
        <h4>Call Start: {start}</h4>
        <DatePicker hintText="call start" name="callStart" /><br/>
        <h4>Call End: {end}</h4>
        <DatePicker hintText="call end" name="callEnd" /><br/>
        <h4>Call Type</h4>
        <select name="callType" defaultValue={props.currentCall.call_type}>
          <option value="basic">Basic</option>
          <option value="manuscript">Manuscript</option>
          <option value="contest">Contest</option>
        </select>
        <h4>Call Judge</h4>
        <TextField type="text" hintText="call judge" name="callJudge" defaultValue={props.currentCall.call_judge} /><br/>
        </div>
        <div id="form-center">
        <h4>Open or Closed</h4>
        <select name="openOrClosed" defaultValue={props.currentCall.open_or_closed}>
          <option value="open">Open</option>
          <option value="closed">Closed</option>
        </select>
        <h4>Call Detail</h4>
        <textarea type="text" name="callDetails" rows="10" cols="30" defaultValue={props.currentCall.call_detail} /><br/>
        </div>
        <div id="form-right">
        <h4>Pages Or Poems</h4>
        <select name="pagesOrPoems" defaultValue={props.currentCall.pages_or_poems}>
          <option value="pages" selected>Pages</option>
          <option value="poems">Poems</option>
        </select>
        <h4>Required Length</h4>
        <TextField type="text" hintText="Required Length" name="reqLength" defaultValue={props.currentCall.req_length}  /><br/>
        <TextField type="text" hintText="fee amount" name="feeAmt" defaultValue={props.currentCall.fee_amt} /><br/>
        <h4>Mail Only</h4>
        <select name="mailOnly" defaultValue={props.currentCall.mail_only}>
          <option value={true}>Yes</option>
          <option value={false} selected>No</option>
        </select>
        <h4>SASE Required</h4>
        <select name="reqSase" defaultValue={props.currentCall.req_sase}>
          <option value={true}>Yes</option>
          <option value={false} selected>No</option>
        </select>
        <h4>Mailing Address</h4>
        <TextField type="text" hintText="Mailing Address" name="mailingAddress" defaultValue={props.currentCall.mailing_address} />
        </div>
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
import {updateCurrentCall, deleteCurrentCall} from '../reducers/oneCall'

export default connect(
  ({ auth, currentCall }) => ({ 
  	user: auth,
    currentCall: currentCall
  }), {updateCurrentCall, deleteCurrentCall},
)(EditCall)
