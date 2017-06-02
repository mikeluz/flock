import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import {Link} from 'react-router'

const AddCall = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.addCall({
      call_name: evt.target.callName.value,
      call_start: evt.target.callStart.value,
      call_end: evt.target.callEnd.value,
      call_type: evt.target.callType.value,
      call_judge: evt.target.callJudge.value,
      call_detail: evt.target.callDetails.value,
      pages_or_poems: evt.target.pagesOrPoems.value,
      req_length: evt.target.reqLength.value,
      fee_amt: evt.target.feeAmt.value,
      mail_only: evt.target.mailOnly.value,
      req_sase: evt.target.reqSase.value,
      mailing_address: evt.target.mailingAddress.value,
      pub_id: props.currentPub.id
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
      <form onSubmit={onSubmit}>
        <h4>Call Name</h4>
        <TextField type="text" hintText="call name" name="callName" /><br/>
        <h4>Call Start</h4>
        <DatePicker hintText="call start" name="callStart" /><br/>
        <h4>Call End</h4>
        <DatePicker hintText="call end" name="callEnd" /><br/>
        <h4>Call Type</h4>
        <select name="callType">
          <option value="basic" selected>Basic</option>
          <option value="manuscript">Manuscript</option>
          <option value="contest">Contest</option>
        </select>
        <h4>Call Judge</h4>
        <TextField type="text" hintText="call judge" name="callJudge" /><br/>
        <h4>Call Detail</h4>
        <textarea type="text" name="callDetails" rows="10" cols="50"/><br/>
        <h4>Pages Or Poems</h4>
        <select name="pagesOrPoems">
          <option value="pages" selected>Pages</option>
          <option value="poems">Poems</option>
        </select>
        <h4>Required Length</h4>
        <TextField type="text" hintText="Required Length" name="reqLength" /><br/>
        <h4>Fee Amount</h4>
        <TextField type="text" hintText="fee amount" name="feeAmt" /><br/>
        <h4>Mail Only</h4>
        <select name="mailOnly">
          <option value={true}>Yes</option>
          <option value={false} selected>No</option>
        </select>
        <h4>SASE Required</h4>
        <select name="reqSase">
          <option value={true}>Yes</option>
          <option value={false} selected>No</option>
        </select>
        <h4>Mailing Address</h4>
        <TextField type="text" hintText="Mailing Address" name="mailingAddress" />
        <br/><br/><br/>
        <RaisedButton 
          type="submit"
          label="Save"
          backgroundColor='#000000'
          labelColor='white'
          onClick={saved}
          />
      </form>
      <br/>
    </div> : <h2>You are trying to access an Admin Only area.</h2>}</div>
    : 
    <h2>Please log in.</h2>}
    </div>
  )
}

import {connect} from 'react-redux'
import {addCall} from '../reducers/oneCall'

export default connect(
  ({ auth, currentPub }) => ({ 
  	user: auth,
    currentPub: currentPub
  }), {addCall},
)(AddCall)
