import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_PUB_SEARCH_RESULTS:
    return action.pubSearchResults;
  }
  return state
}

const SET_PUB_SEARCH_RESULTS = 'SET_PUB_SEARCH_RESULTS'
export const setPubSearchResults = pubSearchResults => ({
  type: SET_PUB_SEARCH_RESULTS, pubSearchResults
})

export const findPubsByName = (searchTerm) =>
	dispatch =>
	  axios.get(`/api/pubs/search/?search=${searchTerm}`)
	    .then((res) => dispatch(setPubSearchResults(res.data)))
	    .catch(() => dispatch(setPubSearchResults(null)))

export default reducer