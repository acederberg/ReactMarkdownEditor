import { EndpointInterface, endpoint_keys, RequestInterface, request_keys } from './types'
import { ContentDocument } from './model/types'
import models from './model/model'

const check_keys = ( endpoint, request ) => {
	console.log( request.body )
	const that = Object.keys( request.body ).find( key => { console.log( key ) ; return endpoint.keys.includes(key) } )
       	console.log( `that = ${ that }` )
	return that
}
const get_collection = ( endpoint, request ) => {
	return models[ request.body.collection ]
}

export default function create_endpoint( endpoint : EndpointInterface ){
	async function wrapper( request, result ) {
		// Check the keys
		if ( !check_keys( endpoint, request ) ){ 
			result.status( 400 )
			result.send( 'InsufficientKeys' )
			return
		}
		// Get collection if it actually exists. If not, leave.
		const collection = get_collection( endpoint, request )
		if ( !collection ){ 
			result.status( 400 )
			result.send( 'CollectionDoesNotExist' )
			return
		}
		// Find data. If fail, report finder error.
		let data : ContentDocument ;
		try{ 
			data = await endpoint.find( collection, request.body )
		}
		catch( err ){
			result.status( 500 )
			result.send( `EndpointFindError: ${ err }` )
			return
		}
		// Clean and return data.
		console.log( data ) 
		result.send( data )
	}	
	return wrapper
}
