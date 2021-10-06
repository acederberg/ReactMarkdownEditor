import { Express } from "express"
import { EndpointsInterface } from "./types"
import { create_endpoint, create_endpoint_default_args as args } from './create_endpoint'

// Use an endpoints object to create multiple endpoints with the same route.d
export default function consume_endpoints( app : Express, endpoints : EndpointsInterface ){
	Object.keys( endpoints.methods ).map( key => {
		const func = create_endpoint( endpoints.methods[ key ], args )
		app[ key ]( endpoints.route, ( request, result ) => func( request, result ) )
	} )	
}
