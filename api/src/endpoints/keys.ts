// Tools for checking keys.
import { EndpointInterface } from './types'

export function arr_contains( A, B ) : Boolean {

	// Returns true if A contains B, or False/undefined/None otherwise.
        // First get the intersection  ( a in A such that a is in B ).
        // If this intersection is has the same size as B, B has lost no elements through the intersection, meaning all of its elements must be contained by B
        const C = A.filter( value => B.includes( value ) )
        return C.length === B.length

}


export function arr_intersects( A, B )  {

        // Tests if the intersection is non-empty
        // Look for one element that is contained in both.
	const C = A.find( key => B.includes( key ) )
        return !!C

}

export const check_keys = ( endpoint, request ) => arr_intersects( Object.keys( request.body ) , endpoint.keys )
export const check_optional = ( endpoint, request ) => arr_intersects( Object.keys( request.body ), endpoint.keys )


