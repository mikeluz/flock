import axios from 'axios'
import store from '../../store'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_CURRENT_PUB:
    return action.currentPub
  }
  return state
}

const SET_CURRENT_PUB = 'SET_CURRENT_PUB'
export const setCurrentPub = currentPub => ({
  type: SET_CURRENT_PUB, currentPub
})

export const getCurrentPub = (nextRouterState) =>
    axios.get(`/api/pubs/${nextRouterState.params.id}`)
      .then((res) => store.dispatch(setCurrentPub(res.data)))
      .catch(() => store.dispatch(setCurrentPub(null)))

export const updateCurrentPub = (nextRouterState) => 
  dispatch =>
    axios.put(`/api/pubs/${nextRouterState.id}`, nextRouterState)
      .then((res) => dispatch(setCurrentPub(res.data)))
      .catch(() => dispatch(setCurrentPub(null)))

export const deleteCurrentPub = (id) => 
  dispatch =>
    axios.delete(`/api/pubs/${id}`)
      .then((res) => dispatch(setCurrentPub(res.data)))
      .catch(() => dispatch(setCurrentPub(null)))

export const addPub = (nextRouterState) => 
  dispatch =>
    axios.post(`/api/pubs`, nextRouterState)
      .then((res) => dispatch(setCurrentPub(res.data)))
      .catch(() => dispatch(setCurrentPub(null)))

export default reducer