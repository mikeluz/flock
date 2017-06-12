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

const AddPub = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.addPub({
      pub_name: evt.target.pubName.value,
      editor_name: evt.target.editorName.value,
      editor_email: evt.target.editorEmail.value,
      web_address: evt.target.webAddress.value,
      submittable_link: evt.target.submittableLink.value,
      pub_format: evt.target.format.value,
      pub_type: evt.target.type.value
    });
    props.findPubsByName('');
    browserHistory.push('/pubs')
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
        <div id="form-left">
        <h4>Publication Name</h4>
        <TextField type="text" hintText="publication name" name="pubName" /><br/>
        <h4>Editor Name</h4>
        <TextField type="text" hintText="publication name" name="editorName" /><br/>
        <h4>Editor Email</h4>
        <TextField type="text" hintText="editor email" name="editorEmail" /><br/>
        <h4>Web Address</h4>
        <TextField type="text" hintText="web address" name="webAddress" /><br/>
        </div>
        <div id="form-right">
        <h4>Submittable Link</h4>
        <TextField type="text" hintText="submittable link" name="submittableLink" /><br/>
        <h4>Format</h4>
        <select name="format">
          <option value="online" selected>Online</option>
          <option value="print">Print</option>
          <option value="both">Both</option>
        </select>
        <h4>Type</h4>
        <select name="type">
          <option value="lit mag" selected>Lit Mag</option>
          <option value="press">Press</option>
          <option value="org">Org</option>
        </select><br/><br/><br/>
        <RaisedButton 
          type="submit"
          label="Save"
          backgroundColor='#000000'
          labelColor='white'
          onClick={saved}
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
import {addPub} from 'APP/app/reducers/pubs/onePub'
import {findPubsByName} from 'APP/app/reducers/pubs/pubSearchResults'

export default connect(
  ({ auth, currentPub }) => ({ 
  	user: auth,
    currentPub: currentPub
  }), {addPub, findPubsByName},
)(AddPub)
