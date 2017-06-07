import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_CALLS_SEARCH_RESULTS:
    return action.callSearchResults;
  }
  return state
}

const SET_CALLS_SEARCH_RESULTS = 'SET_CALLS_SEARCH_RESULTS'
export const setCallSearchResults = callSearchResults => ({
  type: SET_CALLS_SEARCH_RESULTS, callSearchResults
})

export const findCallsByName = (searchTerm) =>
	dispatch =>
	  axios.get(`/api/calls/search/?search=${searchTerm}`)
	    .then((res) => dispatch(setCallSearchResults(res.data)))
	    .catch(() => dispatch(setCallSearchResults(null)))

export default reducer