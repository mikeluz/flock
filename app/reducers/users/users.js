import axios from 'axios'

const reducer = (state=null, action) => {
	// console.log("action", action);
  switch (action.type) {
  case SET_ALL_USERS:
    return action.users
  }
  return state
}

const SET_ALL_USERS = 'SET_ALL_USERS'
export const setAllUsers = users => ({
  type: SET_ALL_USERS, users
})

export const getAllUsers = () =>
  dispatch =>
    axios.get('/api/users')
      .then((res) => dispatch(setAllUsers(res.data)))
      .catch(() => dispatch(setAllUsers(null)))

export default reducer