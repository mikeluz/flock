import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  allPubs: require('./allPubs').default,
  currentPub: require('./onePub').default,
  currentUser: require('./oneUser').default,
  // allCalls: require('./allCalls').default,
  // currentSubs: require('./currentSubs').default,
  // currentCalls: require('./').default,

  // admin only
  users: require('./users').default,
  // allSubs: require('./allSubs').default,
})

export default rootReducer
