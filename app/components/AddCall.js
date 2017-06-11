import React from 'react'
import {browserHistory} from 'react-router'
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

const AddCall = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.addCall({
      call_name: evt.target.callName.value,
      call_start: moment(evt.target.callStart.value).format('LL'),
      call_end: moment(evt.target.callEnd.value).format('LL'),
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
    props.getAllCalls();
    browserHistory.push('/calls')
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
      <h2>New Call for {`${props.currentPub.pub_name}`}</h2>
      <form onSubmit={onSubmit}>
        <div id="form-left">
        <TextField type="text" hintText="call name" name="callName" /><br/>
        <DatePicker hintText="call start" name="callStart" /><br/>
        <DatePicker hintText="call end" name="callEnd" /><br/>
        <h4>Call Type</h4>
        <select name="callType">
          <option value="basic" selected>Basic</option>
          <option value="manuscript">Manuscript</option>
          <option value="contest">Contest</option>
        </select>
        <TextField type="text" hintText="call judge" name="callJudge" /><br/>
        </div>
        <div id="form-center">
        <h4>Call Detail</h4>
        <textarea type="text" name="callDetails" rows="10" cols="30"/><br/>
        </div>
        <div id="form-right">
        <h4>Pages Or Poems</h4>
        <select name="pagesOrPoems">
          <option value="pages" selected>Pages</option>
          <option value="poems">Poems</option>
        </select>
        <TextField type="text" hintText="Required Length" name="reqLength" /><br/>
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
import {addCall} from '../reducers/oneCall'
import {getAllCalls} from '../reducers/allCalls'

export default connect(
  ({ auth, currentPub }) => ({ 
  	user: auth,
    currentPub: currentPub
  }), {addCall, getAllCalls},
)(AddCall)
