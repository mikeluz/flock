import React from 'react'
import Login from './Login'
import WhoAmI from './WhoAmI'

export const Home = ({ user, children }) => (

  <div>
    <nav>
      {user ? <div></div> : <h1>PLEASE LOG IN</h1>}
    </nav>
    {children}
	  {user ? <h1>WELCOME BACK</h1> : <div></div>}
  </div>
)

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {},
)(Home)