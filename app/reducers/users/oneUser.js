import axios from 'axios'
import store from '../../store'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_CURRENT_USER:
    return action.currentUser
  }
  return state
}

const SET_CURRENT_USER = 'SET_CURRENT_USER'
export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER, currentUser
})

export const getCurrentUser = (nextRouterState) =>
    axios.get(`/api/users/${nextRouterState.params.id}`)
      .then((res) => store.dispatch(setCurrentUser(res.data)))
      .catch(() => store.dispatch(setCurrentUser(null)))

export const updateCurrentUser = (nextRouterState) => 
  dispatch =>
    axios.put(`/api/users/${nextRouterState.id}`, nextRouterState)
      .then((res) => dispatch(setCurrentUser(res.data)))
      .catch(() => dispatch(setCurrentUser(null)))

export const deleteCurrentUser = (id) => 
  dispatch =>
    axios.delete(`/api/users/${id}`)
      .then((res) => dispatch(setCurrentUser(res.data)))
      .catch(() => dispatch(setCurrentUser(null)))

export const addUser = (nextRouterState) => 
  dispatch =>
    axios.post(`/api/users`, nextRouterState)
      .then((res) => dispatch(setCurrentUser(res.data)))
      .catch(() => dispatch(setCurrentUser(null)))

export default reducer