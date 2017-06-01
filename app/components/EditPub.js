import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

const EditPub = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.updateCurrentPub({
      id: props.currentPub.id,
      pub_name: evt.target.pubName.value,
      editor_email: evt.target.editorEmail.value,
      web_address: evt.target.webAddress.value,
      submittable_link: evt.target.submittableLink.value
    });
  }

  const saved = () => {
    alert('Saved!');
  }

  const deletePub = () => {
    var confirm = window.confirm("Are you sure?");
    if (confirm) {
      props.deleteCurrentPub(props.currentPub.id)
    }
  }

  return (
    <div>
    {props.user 
    ?
    <div id="centerMe">
    <hr/>
      <form onSubmit={onSubmit}>
        <h4>Publication Name</h4>
        <TextField type="text" hintText="publication name" name="pubName" defaultValue={props.currentPub.pub_name}/><br/>
        <h4>Editor Email</h4>
        <TextField type="text" hintText="editor email" name="editorEmail" defaultValue={props.currentPub.editor_email}/><br/>
        <h4>Web Address</h4>
        <TextField type="text" hintText="web address" name="webAddress" defaultValue={props.currentPub.web_address}/><br/>
        <h4>Submittable Link</h4>
        <TextField type="text" hintText="submittable link" name="submittableLink" defaultValue={props.currentPub.submittable_link}/><br/>
        <RaisedButton label="Delete" onClick={deletePub}/>
        <RaisedButton 
          type="submit"
          label="Save"
          backgroundColor='#000000'
          labelColor='white'
          onClick={saved}
          />
          <Link to={`/pubs/${props.currentPub.id}`}><RaisedButton label="View"/></Link>
      </form>
    </div>
    : 
    <h2>Please log in.</h2>}
    </div>
  )
}

import {connect} from 'react-redux'
import {updateCurrentPub, deleteCurrentPub} from '../reducers/onePub'

export default connect(
  ({ auth, currentPub }) => ({ 
  	user: auth,
    currentPub: currentPub
  }), {updateCurrentPub, deleteCurrentPub},
)(EditPub)
