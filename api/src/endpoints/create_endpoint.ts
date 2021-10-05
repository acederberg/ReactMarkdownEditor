// Create an endpoint from an EndpointInterface. Objectives for `create_endpoint`
// * Create a function to make the endpoint callbacks, the callback in `app.<https method>`.
// * Use this function to check if the minimal amount of fields are provided using `EndpointInterface.keys`. `collection` must be provided in most cases and thus a keyword for `create_endpoint` will be included.
// * Also check if the collection exists unless it won't need a collection, e.g. latest.
// * Call the `EndpointInterface.find` method, a call to mongodb.
// * Call the `EndpointInterface.clean` method if it is provided.

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


// Trivial mapping
const default_clean = ( data ) => data
export const create_endpoint_default_args = {
	requires_collection : true
}

export function create_endpoint( endpoint : EndpointInterface, args) : Function {
	// Stupid destructuring doesn't work. kms
	const { requires_collection } = args

	// Defines the default cleaning
	const clean = endpoint.clean ? endpoint.clean : default_clean
	const wrapper = async ( request, result ) => {
		// Check the keys
		if ( !check_keys( endpoint, request ) ){ 
			result.status( 400 )
			result.send( 'InsufficientKeys' )
			return
		}
		// Get collection if it actually exists. If not, leave.
		const collection = get_collection( endpoint, request )
		if ( requires_collection && !collection ){ 
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
		result.send( clean( data ) )
	}	
	return wrapper
}
