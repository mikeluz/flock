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
import EditPoem from './components/EditPoem'
import Subs from './components/Subs'
import Pubs from './components/Pubs'
import Calls from './components/Calls'
import AddCall from './components/AddCall'
import OnePub from './components/OnePub'
import OneCall from './components/OneCall'
import EditCall from './components/EditCall'
import EditPub from './components/EditPub'
import EditSub from './components/EditSub'
import AddPub from './components/AddPub'
import AddSub from './components/AddSub'
import AddPoem from './components/AddPoem'
import OneSub from './components/OneSub'
import Poems from './components/Poems'
import OnePoem from './components/OnePoem'
import FlockPad from './components/FlockPad'

import {getCurrentPub} from './reducers/onePub'
import {getCurrentUser} from './reducers/oneUser'
import {getCurrentPoem} from './reducers/onePoem'
import {getCurrentCall} from './reducers/oneCall'
import {getCurrentSub} from './reducers/oneSub'

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
        <Route path="/poems/add" component={AddPoem} />
        <Route path="/poems" component={Poems} />
        <Route path="/poems/:id" component={OnePoem} onEnter={(nextRouterState) => getCurrentPoem(nextRouterState)} />
        <Route path="/poems/:id/edit" component={EditPoem}/>
        <Route path="/flockpad" component={FlockPad} />
        <Route path="/users/add" component={AddUser}/>
        <Route path="/users/:id" component={OneUser} onEnter={(nextRouterState) => getCurrentUser(nextRouterState)} />
        <Route path="/users/:id/edit" component={EditUser}/>
        <Route path="/users" component={Users} />
        <Route path="/subs" component={Subs} />
        <Route path="/subs/add" component={AddSub} />
        <Route path="/subs/:id" component={OneSub} onEnter={(nextRouterState) => getCurrentSub(nextRouterState)} />
        <Route path="/subs/:id/edit" component={EditSub}/>
        <Route path="/calls/add" component={AddCall} />
        <Route path="/calls" component={Calls} />
        <Route path="/calls/:id" component={OneCall} onEnter={(nextRouterState) => getCurrentCall(nextRouterState)} />
        <Route path="/calls/:id/edit" component={EditCall}/>
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
