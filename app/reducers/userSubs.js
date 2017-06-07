import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_CURRENT_USER_SUBS:
    return action.userSubs;
  }
  return state
}

const SET_CURRENT_USER_SUBS = 'SET_CURRENT_USER_SUBS'
export const setUserSubs = userSubs => ({
  type: SET_CURRENT_USER_SUBS, userSubs
})

export const getUserSubs = (userId) =>
	dispatch =>
	  axios.get(`/api/users/${userId}/subs`)
	    .then((res) => dispatch(setUserSubs(res.data)))
	    .catch(() => dispatch(setUserSubs(null)))

export default reducer