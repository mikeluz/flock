import React from 'react'

export const Login = ({ login }) => (

  <div>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
  <br/>
    <h1>Please Log In</h1>
    <form onSubmit={evt => {
      evt.preventDefault()
      login(evt.target.username.value, evt.target.password.value)
    } }>
      <label>Username</label><br/><input name="username" /><br/>
      <label>Password</label><br/><input name="password" type="password" /><br/>
      <input type="submit" value="Login" />
    </form>
  </div>
)

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {login},
)(Login)
