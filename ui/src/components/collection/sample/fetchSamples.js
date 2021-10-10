export default ( collection ) => fetch( `${process.env.REACT_APP_API_URI}/collections/${collection}/10` )
	.then( request => request.json() )
	.then( data => {
		console.log( data )
		return data
	} )
