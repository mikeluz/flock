import axios from 'axios'
import store from '../store'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_CURRENT_SUB:
    return action.currentSub
  }
  return state
}

const SET_CURRENT_SUB = 'SET_CURRENT_SUB'
export const setCurrentSub = currentSub => ({
  type: SET_CURRENT_SUB, currentSub
})

export const addCurrentSub = (callId) => 
  dispatch =>
    axios.put(`/api/subs`, {
      call_id: callId
    })
      .then((res) => store.dispatch(setsCurrentSub(res.data)))
      .catch(() => store.dispatch(setCurrentSub(null)))

export const getCurrentSub = (nextRouterState) =>
    axios.get(`/api/subs/current`, nextRouterState)
      .then((res) => store.dispatch(setCurrentSub(res.data)))
      .catch(() => store.dispatch(setCurrentSub(null)))

export const updateCurrentSub = (nextRouterState) => 
    axios.put(`/api/subs/${nextRouterState.id}`, nextRouterState)
      .then((res) => store.dispatch(setCurrentSub(res.data)))
      .catch(() => store.dispatch(setCurrentSub(null)))

export const deleteCurrentSub = (id) => 
    axios.delete(`/api/subs/${id}`)
      .then((res) => store.dispatch(setCurrentSub(res.data)))
      .catch(() => store.dispatch(setCurrentSub(null)))

export const addNewSub = (newSub) => 
  dispatch =>
    axios.post(`/api/subs`, newSub)
      .then((res) => {
        console.log("addNewSub res", res.data);
        dispatch(setCurrentSub(res.data))
      })
      .catch(() => dispatch(setCurrentSub(null)))

export default reducer