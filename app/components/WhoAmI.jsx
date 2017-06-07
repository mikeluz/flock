import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router'

export const WhoAmI = ({ user, logout, getUserSubs }) => (
  <div className="whoami" id="centerMe">
  	<br/>
    {/*<span className="whoami-user-name">{user && user.name}</span><br/><br/>*/}
    <Link to="/dashboard"><RaisedButton label={user.name} onClick={() => getUserSubs(user.id)}/></Link>
    <Link to="/"><RaisedButton type="submit" label="Logout" backgroundColor='#000000' labelColor='white' onClick={logout} /></Link>
  </div>
)

import {logout} from 'APP/app/reducers/auth'
import {getUserSubs} from 'APP/app/reducers/userSubs'
import {connect} from 'react-redux'

export default connect(
  ({ auth }) => ({ user: auth }),
  {logout, getUserSubs},
)(WhoAmI)
