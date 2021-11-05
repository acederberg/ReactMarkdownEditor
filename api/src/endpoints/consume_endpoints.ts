import { Express } from "express"
import { EndpointsInterface } from "./types"
import { create_endpoint, create_endpoint_default_args as args } from './create_endpoint'

// Use an endpoints object to create multiple endpoints with the same route.d
export default function consume_endpoints( app : Express, endpoints : EndpointsInterface ){
	Object.keys( endpoints.methods ).map( key => {
		const processed : Object = create_endpoint( endpoints.methods[ key ], args )
		// There must be a better way.
		processed[ 'middleware' ] ? app[ key ]( 
			endpoints.route, 
			...processed[ 'middleware' ],
			( request, result ) => {
				processed[ 'method' ]( request, result ) 
			}
		) : app[ key ](
			endpoints.route,
			( request, result ) => processed[ 'method' ]( request, result )
		)
	} )	
}
