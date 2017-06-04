import { combineReducers } from 'redux'

const appReducer = combineReducers({
  auth: require('./auth').default,
  allPubs: require('./allPubs').default,
  pubSearchResults: require('./pubSearchResults').default,
  currentPub: require('./onePub').default,
  currentUser: require('./oneUser').default,
  allPoems: require('./allPoems').default,
  // allCalls: require('./allCalls').default,
  // currentSubs: require('./currentSubs').default,
  // currentCalls: require('./').default,

  // admin only
  users: require('./users').default,
  // allSubs: require('./allSubs').default,
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
