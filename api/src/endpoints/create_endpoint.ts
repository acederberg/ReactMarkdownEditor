// Create` an endpoint from an EndpointInterface. Objectives for `create_endpoint`
// * Create a function to make the endpoint callbacks, the callback in `app.<https method>`.
// * Use this function to check if the minimal amount of fields are provided using `EndpointInterface.keys`. `collection` must be provided in most cases and thus a keyword for `create_endpoint` will be included.
// * Also check if the collection exists unless it won't need a collection, e.g. latest.
// * Call the `EndpointInterface.find` method, a call to mongodb.
// * Call the `EndpointInterface.clean` method if it is provided.

// Model imports
import { Error } from 'mongoose'
import { ContentInterface } from './model/types'
import { models } from './model'

// Local imports
import { EndpointInterface, endpoint_keys, RequestInterface, request_keys } from './types'
import { check_keys, check_optional } from './keys'

// Get the model
const get_model = ( endpoint, request ) => models[ request.body.collection ]
const default_clean = ( data ) => data

export const create_endpoint_default_args = { requires_collection : true, can_be_empty : false }

export function create_endpoint( endpoint : EndpointInterface, args) : Function {

	// Locals
	const { requires_collection, can_be_empty } = args
	//const { check_keys, check_keys_metadata } = create_key_checkers( endpoint )
	const clean = endpoint.clean ? endpoint.clean : default_clean

	// decorated function
	const wrapper = async ( request, result ) => {
		console.log( request.body )
		// Check the keys
		if ( !can_be_empty ){
			if ( !request.body ){
				result.status( 400 )
				result.send( 'RequestMustHaveBody' )
				return
			}
			if ( !check_keys( endpoint, request ) || !check_keys( endpoint, request ) ){ 
				console.log( request.body )
				result.status( 400 )
				result.send( 'InsufficientKeys' )
				return
			}
		}

		// Get collection if it actually exists. If not and is needed, leave.
		const model = get_model( endpoint, request )
		// If a collection is required and the model was found, do stuff
		if ( requires_collection && model ){ 
			// Find data. If fail, report finder error.
			let data : ContentInterface ;
			try{ 
				data = await endpoint.find( model, request.body )
			}
			catch( err ){
				console.log( err )
				result.status( err instanceof Error.ValidationError ? 400 : 500 )
				result.send( `EndpointFindThrewError: ${ err }` )
				return
			}
			// Clean and return data.
			result.send( clean( data ) )
		}
		// If a collection is required but the model was not found, let the client know the that the collection they specified has no corresponding model
		else if ( requires_collection && !model ){
			result.status( 400 )
			result.send("UndefinedCollection")
		}
		// Otherwise, do the default behaviour.
		else {
			result.send("UndefinedEndpoint")
		}
	}

	return wrapper
       
}
