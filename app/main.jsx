'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, browserHistory, hashHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import injectTapEventPlugin from 'react-tap-event-plugin'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

import store from './store'
import Home from './components/Home'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import NotFound from './components/NotFound'
import Dashboard from './components/Dashboard'
import NavBar from './components/NavBar'
import Users from './components/Users'
import OneUser from './components/OneUser'
import AddUser from './components/AddUser'
import EditUser from './components/EditUser'
import Subs from './components/Subs'
import Pubs from './components/Pubs'
import Calls from './components/Calls'
import AddCall from './components/AddCall'
import OnePub from './components/OnePub'
import EditPub from './components/EditPub'
import AddPub from './components/AddPub'
import FlockPad from './components/FlockPad'

import {getCurrentPub} from './reducers/onePub'
import {getCurrentUser} from './reducers/oneUser'

const App = connect(
  ({ auth }) => ({ user: auth })
)(
  ({ user, children }) =>
  <MuiThemeProvider>
    <div>
      <nav>
        {user ? <div><NavBar/><WhoAmI/></div> : <Login/>}
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
        <Route path="/flockpad" component={FlockPad} />
        <Route path="/users/add" component={AddUser}/>
        <Route path="/users/:id" component={OneUser} onEnter={(nextRouterState) => getCurrentUser(nextRouterState)} />
        <Route path="/users/:id/edit" component={EditUser}/>
        <Route path="/users" component={Users} />
        <Route path="/subs" component={Subs} />
        <Route path="/calls/add" component={AddCall} />
        <Route path="/calls" component={Calls} />
        <Route path="/pubs/add" component={AddPub}/>
        <Route path="/pubs/:id" component={OnePub} onEnter={(nextRouterState) => getCurrentPub(nextRouterState)} />
        <Route path="/pubs/:id/edit" component={EditPub}/>
        <Route path="/pubs" component={Pubs}/>
      </Route>
      <Route path='*' component={NotFound} />
    </Router>
  </Provider>,
  document.getElementById('main')
)
