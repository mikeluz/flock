import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_ALL_POEMS:
    return action.poems;
  }
  return state
}

const SET_ALL_POEMS = 'SET_ALL_POEMS'
export const setAllPoems = poems => ({
  type: SET_ALL_POEMS, poems
})

export const getAllPoems = () =>
  dispatch =>
    axios.get('/api/poems')
      .then((res) => dispatch(setAllPoems(res.data)))
      .catch(() => dispatch(setAllPoems(null)))

export default reducer