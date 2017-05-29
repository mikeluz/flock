import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  auth: require('./auth').default,
  allPubs: require('./allPubs').default,
  // allCalls: require('./allCalls').default,
  // currentUser: require('./currentUser').default,
  // currentSubs: require('./currentSubs').default,
  // currentPubs: require('./currentPubs').default,
  // currentCalls: require('./').default,

  // admin only
  // allUsers: require('./allUsers').default,
  // allSubs: require('./allSubs').default,
})

export default rootReducer
