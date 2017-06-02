import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_SEARCH_RESULTS:
    return action.pubs;
  }
  return state
}

const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const setPubSearchResults = pubs => ({
  type: SET_SEARCH_RESULTS, pubs
})

export const findPubsByName = (searchTerm) =>
	dispatch =>
	  axios.get(`/api/pubs/search/?search=${searchTerm}`)
	    .then((res) => dispatch(setPubSearchResults(res.data)))
	    .catch(() => dispatch(setPubSearchResults(null)))

export default reducer