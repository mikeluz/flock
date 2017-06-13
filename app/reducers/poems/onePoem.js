import axios from 'axios'
import store from '../../store'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_CURRENT_POEM:
    return action.currentPoem
  }
  return state
}

const SET_CURRENT_POEM = 'SET_CURRENT_POEM'
export const setCurrentPoem = currentPoem => ({
  type: SET_CURRENT_POEM, currentPoem
})

export const getCurrentPoem = (nextRouterState) => 
    axios.get(`/api/poems/${nextRouterState.params.id}`)
      .then((res) => store.dispatch(setCurrentPoem(res.data)))
      .catch(() => store.dispatch(setCurrentPoem(null)))

export const updateCurrentPoem = (nextRouterState) => 
  dispatch =>
    axios.put(`/api/poems/${nextRouterState.id}`, nextRouterState)
      .then((res) => dispatch(setCurrentPoem(res.data)))
      .catch(() => dispatch(setCurrentPoem(null)))

export const deleteCurrentPoem = (id) => 
  dispatch =>
    axios.delete(`/api/poems/${id}`)
      .then((res) => dispatch(setCurrentPoem(res.data)))
      .catch(() => dispatch(setCurrentPoem(null)))

export const addPoem = (nextRouterState) => 
  dispatch => {
    console.log("ADD POEM");
    axios.post(`/api/poems`, nextRouterState)
      .then((res) => dispatch(setCurrentPoem(res.data)))
      .catch(() => dispatch(setCurrentPoem(null)))
  }

export default reducer