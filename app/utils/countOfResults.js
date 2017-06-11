import React from 'react'

const countOfResults = (results) => {

	return (
		<div>{results.length > 0 ? `${results.length} results` : 'No results'}</div>
		)

}

export default countOfResults;