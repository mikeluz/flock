import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_ALL_PUBS:
    return action.pubs;
  }
  return state
}

const SET_ALL_PUBS = 'SET_ALL_PUBS'
export const setAllPubs = pubs => ({
  type: SET_ALL_PUBS, pubs
})

export const getAllPubs = () =>
  dispatch =>
    axios.get('/api/pubs')
      .then((res) => dispatch(setAllPubs(res.data)))
      .catch(() => dispatch(setAllPubs(null)))

export default reducer