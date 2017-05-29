import React from 'react'

const Dashboard = ({ user, children }) => (

  <div>
   {user && <h1>Welcome back, {user.name}</h1>}
  </div>
)

import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {},
)(Dashboard)