import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
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

const OnePoem = (props) => {

  let currentPoemId = props.currentPoem ? props.currentPoem.id : 0;
  
  return (
  <div id="centerMe">
  {props.user 
  ?
  <div>
  <hr/>
  <Paper style={style} zDepth={3}>
  <h4>Title of Poem</h4>
  <h2>{props.currentPoem ? props.currentPoem.name : "No selection was made."}</h2>
  {props.user.isAdmin && <div>
    <Link to={`/pubs/${currentPoemId}/edit`}>
    <RaisedButton type="submit" label="Edit" backgroundColor='#000000' labelColor='white' />
    </Link>
    <Link to={`/calls/add`}>
    <RaisedButton type="submit" label="Add To Submission" backgroundColor='white' labelColor='black' />
    </Link></div>}
  </Paper>
  </div>
  : 
  <h2>Please log in.</h2>}
  </div>
)}

import {connect} from 'react-redux'

export default connect(
  ({ auth, currentPoem }) => ({ 
  	user: auth,
    currentPoem: currentPoem
  }), {},
)(OnePoem)