export default ( collection ) => fetch( `${process.env.REACT_APP_API_URI}/collections/${collection}/10` )
	.then( async ( request ) => { 
		console.log( request.status )
		const data = await request.json()
		console.log( request.status === 400, Object.keys( data ).length === 0 )
		return request.status === 400 || Object.keys( data ).length === 0 
		? null 
		: data
	} )
