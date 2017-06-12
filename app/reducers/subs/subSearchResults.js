import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_SUB_SEARCH_RESULTS:
    return action.subSearchResults;
  }
  return state
}

const SET_SUB_SEARCH_RESULTS = 'SET_SUB_SEARCH_RESULTS'
export const setSubSearchResults = subSearchResults => ({
  type: SET_SUB_SEARCH_RESULTS, subSearchResults
})

export const findSubsByUserName = (userName) =>
	dispatch =>
	  axios.get(`/api/subs/search/?search=${userName}`)
	    .then((res) => dispatch(setSubSearchResults(res.data)))
	    .catch(() => dispatch(setSubSearchResults(null)))

export default reducer