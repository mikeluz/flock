import axios from 'axios'
import store from '../../store'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_CURRENT_CALL:
    return action.currentCall
  }
  return state
}

const SET_CURRENT_CALL = 'SET_CURRENT_CALL'
export const setCurrentCall = currentCall => ({
  type: SET_CURRENT_CALL, currentCall
})

export const getCurrentCall = (nextRouterState) =>
    axios.get(`/api/calls/${nextRouterState.params.id}`)
      .then((res) => store.dispatch(setCurrentCall(res.data)))
      .catch(() => store.dispatch(setCurrentCall(null)))

export const updateCurrentCall = (nextRouterState) => 
  dispatch =>
    axios.put(`/api/calls/${nextRouterState.id}`, nextRouterState)
      .then((res) => dispatch(setCurrentCall(res.data)))
      .catch(() => dispatch(setCurrentCall(null)))

export const deleteCurrentCall = (id) => 
  dispatch =>
    axios.delete(`/api/calls/${id}`)
      .then((res) => dispatch(setCurrentCall(res.data)))
      .catch(() => dispatch(setCurrentCall(null)))

export const addCall = (nextRouterState) => 
  dispatch =>
    axios.post(`/api/calls`, nextRouterState)
      .then((res) => dispatch(setCurrentCall(res.data)))
      .catch(() => dispatch(setCurrentCall(null)))

export default reducer