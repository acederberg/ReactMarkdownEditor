export default ( collection ) => fetch( `${process.env.REACT_APP_API_URI}/collections/${collection}/10` )
	.then( async ( request ) => { 
		const data = await request.json()
		return request.status === 400 || Object.keys( data ).length === 0 
		? null 
		: data
	} )
