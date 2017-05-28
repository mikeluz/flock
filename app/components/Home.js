import React from 'react'

export const Home = () => (

  <div>
  <h1>FLOCK</h1>
  </div>
)

import {connect} from 'react-redux'

export default connect(
  state => ({}),
  {},
)(Home)