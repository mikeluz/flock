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

const EditPoem = (props) => { 

  const onSubmit = evt => {
    evt.preventDefault();
    props.updateCurrentPoem({
      id: props.currentPoem.id,
      name: evt.target.poemName.value
    });
    browserHistory.push(`/poems/${props.currentPoem.id}`)
  }

  const saved = () => {
    alert('Saved!');
  }

  const deletePoem = () => {
    var confirm = window.confirm("Are you sure?");
    if (confirm) {
      props.deleteCurrentPoem(props.currentPoem.id)
      props.getAllPoems();
      browserHistory.push('/poems')
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
        <TextField type="text" hintText="Name" name="poemName" defaultValue={props.currentPoem.name}/><br/>
        <br/>
        <RaisedButton label="Delete" onClick={deletePoem}/>
        <RaisedButton 
          type="submit"
          label="Save"
          backgroundColor='#000000'
          labelColor='white'
          onClick={saved}
          />
          <Link to={`/poems/${props.currentPoem.id}`}><RaisedButton label="View"/></Link>
      </form>
      </Paper>
    </div>
    : 
    <h2 id="centerMe">Please log in.</h2>}
    </div>
  )
}

import {connect} from 'react-redux'
import {updateCurrentPoem, deleteCurrentPoem} from '../reducers/onePoem'
import {getAllPoems} from '../reducers/allPoems'

export default connect(
  ({ auth, currentPoem }) => ({ 
  	user: auth,
    currentPoem: currentPoem
  }), {updateCurrentPoem, deleteCurrentPoem, getAllPoems},
)(EditPoem)
