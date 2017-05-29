import React from 'react'

const Subs = ({ user, children }) => (

  <div>
   {user ? <div>{user.isAdmin ? <h1>SUBMISSIONS</h1> : <h2>You are trying to access an Admin Only area.</h2>}</div> : <h2>Please log in.</h2>}
  </div>
)

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {},
)(Subs)