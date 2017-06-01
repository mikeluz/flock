import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

const AddPub = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.addPub({
      pub_name: evt.target.pubName.value,
      editor_email: evt.target.editorEmail.value,
      web_address: evt.target.webAddress.value,
      submittable_link: evt.target.submittableLink.value
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
        <h4>Publication Name</h4>
        <TextField type="text" hintText="publication name" name="pubName" /><br/>
        <h4>Editor Email</h4>
        <TextField type="text" hintText="editor email" name="editorEmail" /><br/>
        <h4>Web Address</h4>
        <TextField type="text" hintText="web address" name="webAddress" /><br/>
        <h4>Submittable Link</h4>
        <TextField type="text" hintText="submittable link" name="submittableLink" /><br/>
        <RaisedButton 
          type="submit"
          label="Save"
          backgroundColor='#000000'
          labelColor='white'
          onClick={saved}
          />
      </form>
    </div> : <h2>You are trying to access an Admin Only area.</h2>}</div>
    : 
    <h2>Please log in.</h2>}
    </div>
  )
}

import {connect} from 'react-redux'
import {addPub} from '../reducers/onePub'

export default connect(
  ({ auth, currentPub }) => ({ 
  	user: auth,
    currentPub: currentPub
  }), {addPub},
)(AddPub)
