import { combineReducers } from 'redux'

const appReducer = combineReducers({
  auth: require('./auth').default,
  allPubs: require('./allPubs').default,
  pubSearchResults: require('./pubSearchResults').default,
  callSearchResults: require('./callSearchResults').default,
  poemSearchResults: require('./poemSearchResults').default,
  subSearchResults: require('./subSearchResults').default,
  currentPub: require('./onePub').default,
  currentUser: require('./oneUser').default,
  currentCall: require('./oneCall').default,
  currentSub: require('./oneSub').default,
  allPoems: require('./allPoems').default,
  currentPoem: require('./onePoem').default,
  allCalls: require('./allCalls').default,
  allSubs: require('./allSubs').default,
  
  // for user dashboard
  userSubs: require('./userSubs').default,
  // currentCalls: require('./currentCalls').default,

  // admin only
  users: require('./users').default,
  // allSubs: require('./allSubs').default,

  // flockpad
  currentJot: require('./currentJot').default
})

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    state = undefined
  }

  return appReducer(state, action)
}

export default rootReducer
