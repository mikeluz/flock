import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_POEM_SEARCH_RESULTS:
    return action.poemSearchResults;
  }
  return state
}

const SET_POEM_SEARCH_RESULTS = 'SET_POEM_SEARCH_RESULTS'
export const setPoemSearchResults = poemSearchResults => ({
  type: SET_POEM_SEARCH_RESULTS, poemSearchResults
})

export const findPoemsByName = (searchTerm) =>
	dispatch =>
	  axios.get(`/api/poems/search/?search=${searchTerm}`)
	    .then((res) => dispatch(setPoemSearchResults(res.data)))
	    .catch(() => dispatch(setPoemSearchResults(null)))

export default reducer