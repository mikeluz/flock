import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_ALL_CALLS:
    return action.calls;
  }
  return state
}

const SET_ALL_CALLS = 'SET_ALL_CALLS'
export const setAllCalls = calls => ({
  type: SET_ALL_CALLS, calls
})

export const getAllCalls = () =>
  dispatch =>
    axios.get('/api/calls')
      .then((res) => dispatch(setAllCalls(res.data)))
      .catch(() => dispatch(setAllCalls(null)))

export default reducer