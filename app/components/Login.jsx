import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

export const Login = ({ login }) => (

  <div className='container text-center'>
  <br/>
  <br/>
  <br/>
    <h1 id="banner">FLOCK</h1>
    <form onSubmit={evt => {
      evt.preventDefault()
      login(evt.target.username.value, evt.target.password.value)
    } }>
      <TextField hintText="username" name="username" /><br/>
      <TextField hintText="password" name="password" type="password" /><br/><br/>
      <RaisedButton type="submit" label="Login" backgroundColor='#000000' labelColor='white' />
    </form>
  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
