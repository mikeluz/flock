import axios from 'axios'

const reducer = (state=null, action) => {
  switch (action.type) {
  case SET_CURRENT_JOT:
    return action.currentJot;
  }
  return state
}

const SET_CURRENT_JOT = 'SET_CURRENT_JOT'
export const setCurrentJot = currentJot => ({
  type: SET_CURRENT_JOT, currentJot
})

export const getCurrentJot = (searchTerm) => 
	dispatch =>
    axios.get('/api/print')
	    .then((res) => {
        let jot = res.data.split("----")[0].slice(0, -1)
        dispatch(setCurrentJot(jot))
      })
	    .catch(() => dispatch(setCurrentJot('')))

export default reducer