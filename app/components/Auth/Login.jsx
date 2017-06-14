import React from 'react'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton';

class Login extends React.Component{

   constructor(props) {
    super(props)

    this.state = {
      badLogin: ''
    }
   }

  render() {

    return (
    <div className='container text-center'>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
    <br/>
      <div id="centerMe">
        <h1 id="banner">FLOCK</h1>
        <form onSubmit={evt => {
          evt.preventDefault()
          this.props.login(evt.target.username.value, evt.target.password.value)
          this.setState({
            badLogin: 'Invalid entry. Please try again.'
          })
        } }>
          <TextField hintText="email" name="username" errorText={this.state.badLogin} /><br/>
          <TextField hintText="password" name="password" type="password" errorText={this.state.badLogin} /><br/><br/>
          <RaisedButton type="submit" label="Login" backgroundColor='#000000' labelColor='white' />
        </form>
      </div>
    </div>
    )
  }
}

import {login} from 'APP/app/reducers/auth'
import {connect} from 'react-redux'

export default connect(
  ({auth}) => ({user: auth}),
  {login},
)(Login)
