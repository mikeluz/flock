import { combineReducers } from 'redux'

const appReducer = combineReducers({

  // logged-in user
  auth: require('./auth').default,

  // global search
  pubSearchResults: require('./pubs/pubSearchResults').default,
  callSearchResults: require('./calls/callSearchResults').default,
  poemSearchResults: require('./poems/poemSearchResults').default,
  
  // current
  currentPub: require('./pubs/onePub').default,
  currentUser: require('./users/oneUser').default,
  currentCall: require('./calls/oneCall').default,
  currentSub: require('./subs/oneSub').default,
  currentPoem: require('./poems/onePoem').default,
  
  // dashboard
  userSubs: require('./users/userSubs').default,

  // admin only
  users: require('./users/users').default,
  subSearchResults: require('./subs/subSearchResults').default,

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
