import React from 'react'
import {Link} from 'react-router'

class FlockPad extends React.Component {

  constructor(props) {
    super(props);
  

  }

  render() {

    return (

      <div id="centerMe">
      <h1 id="banner">FLOCKPAD</h1>
      <textarea id="flockpad" rows="20" cols="100">Collaborative writing!</textarea>
      </div>

      )

  }

}

import {connect} from 'react-redux'

export default connect(
  ({ auth, allPubs }) => ({ 
  	user: auth,
  }), {},
)(FlockPad)
