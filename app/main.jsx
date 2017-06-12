'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, hashHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import store from './store'

// auth
import Login from './components/Auth/Login'
import WhoAmI from './components/Auth/WhoAmI'

// bad roquest
import NotFound from './components/NotFound'

// layout
import NavBar from './components/NavBar'
import Dashboard from './components/Dashboard/Dashboard'
import FlockPad from './components/FlockPad'

///////////////////////
// ENTITIES ////////////
//////////////////////////
// USERS
import Users from './components/Users/Users'
import OneUser from './components/Users/OneUser'
import AddUser from './components/Users/AddUser'
import EditUser from './components/Users/EditUser'

// SUBS
import Subs from './components/Subs/Subs'
import OneSub from './components/Subs/OneSub'
import AddSub from './components/Subs/AddSub'
import EditSub from './components/Subs/EditSub'

// PUBS
import Pubs from './components/Pubs/Pubs'
import OnePub from './components/Pubs/OnePub'
import AddPub from './components/Pubs/AddPub'
import EditPub from './components/Pubs/EditPub'

// CALLS
import Calls from './components/Calls/Calls'
import OneCall from './components/Calls/OneCall'
import AddCall from './components/Calls/AddCall'
import EditCall from './components/Calls//EditCall'

// POEMS
import Poems from './components/Poems/Poems'
import OnePoem from './components/Poems/OnePoem'
import AddPoem from './components/Poems/AddPoem'
import EditPoem from './components/Poems/EditPoem'
////////////////////////////////////

// 'On Enter' action creators
import {getCurrentPub} from './reducers/pubs/onePub'
import {getCurrentUser} from './reducers/users/oneUser'
import {getCurrentPoem} from './reducers/poems/onePoem'
import {getCurrentCall} from './reducers/calls/oneCall'
import {getCurrentSub} from './reducers/subs/oneSub'

// gateway app -- keeps out non-users
// also provides Material-UI Theme
const App = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
  <MuiThemeProvider>
    <div>
      <nav>
        {user ? 
          <div>
          <NavBar/>
          <WhoAmI/>
          </div> : <Login/>}
      </nav>
      {children}
    </div>
  </MuiThemeProvider>
)

injectTapEventPlugin()
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to="/dashboard" />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/poems" component={Poems} />
        <Route path="/poems/:id" component={OnePoem} onEnter={(nextRouterState) => getCurrentPoem(nextRouterState)} />
        <Route path="/poems/add" component={AddPoem} />
        <Route path="/poems/:id/edit" component={EditPoem}/>
        <Route path="/flockpad" component={FlockPad} />
        <Route path="/users" component={Users} />
        <Route path="/users/:id" component={OneUser} onEnter={(nextRouterState) => getCurrentUser(nextRouterState)} />
        <Route path="/users/add" component={AddUser}/>
        <Route path="/users/:id/edit" component={EditUser}/>
        <Route path="/subs" component={Subs} />
        <Route path="/subs/:id" component={OneSub} onEnter={(nextRouterState) => getCurrentSub(nextRouterState)} />
        <Route path="/subs/add" component={AddSub} />
        <Route path="/subs/:id/edit" component={EditSub}/>
        <Route path="/calls" component={Calls} />
        <Route path="/calls/:id" component={OneCall} onEnter={(nextRouterState) => getCurrentCall(nextRouterState)} />
        <Route path="/calls/add" component={AddCall} />
        <Route path="/calls/:id/edit" component={EditCall}/>
        <Route path="/pubs" component={Pubs}/>
        <Route path="/pubs/:id" component={OnePub} onEnter={(nextRouterState) => getCurrentPub(nextRouterState)} />
        <Route path="/pubs/add" component={AddPub}/>
        <Route path="/pubs/:id/edit" component={EditPub}/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
