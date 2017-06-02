import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_ALL_PUBS:
    return action.pubs;
  case SET_SEARCH_RESULTS:
    return action.pubs;
  }
  return state
}

const SET_ALL_PUBS = 'SET_ALL_PUBS'
export const setAllPubs = pubs => ({
  type: SET_ALL_PUBS, pubs
})

const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const setPubSearchResults = pubs => ({
  type: SET_SEARCH_RESULTS, pubs
})

export const getAllPubs = () =>
  dispatch =>
    axios.get('/api/pubs')
      .then((res) => dispatch(setAllPubs(res.data)))
      .catch(() => dispatch(setAllPubs(null)))

export const findPubsByName = (searchTerm) =>
  axios.get(`/api/pubs/search/?search=${searchTerm}`)
    .then((res) => dispatch(setPubSearchResults(res.data)))
    .catch(() => dispatch(setPubSearchResults(null)))

export default reducer