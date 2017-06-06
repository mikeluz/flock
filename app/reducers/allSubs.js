import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_ALL_SUBS:
    return action.subs;
  }
  return state
}

const SET_ALL_SUBS = 'SET_ALL_SUBS'
export const setAllSubs = subs => ({
  type: SET_ALL_SUBS, subs
})

export const getAllSubs = () =>
  dispatch =>
    axios.get('/api/subs')
      .then((res) => dispatch(setAllSubs(res.data)))
      .catch(() => dispatch(setAllSubs(null)))

export default reducer