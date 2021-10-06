// Tools for checking keys.
import { EndpointInterface } from './types'

function arr_contains( A, B ) : Boolean {
        // Returns true if A contains B, or False/undefined/None otherwise.
        // First get the intersection  ( a in A such that a is in B ).
        // If this intersection is has the same size as B, B has lost no elements through the intersection, meaning all of its elements must be contained by B
	console.log( "called arr_contains" )
        const C = A.filter( value => B.includes( value ) )
	console.log( A, B, C )
        return C.length === B.length
}
function arr_intersects( A, B )  {
        // Tests if the intersection is non-empty
        // Look for one element that is contained in both.
	console.log( "called arr_intersects" )
	const C = A.find( key => B.includes( key ) )
        return !!C
}
const arr_decide = ( bool ) => bool ? arr_contains : arr_intersects

export default function create_key_checkers( endpoint : EndpointInterface ) {
       	let keys_mapping = arr_decide( endpoint.requires_all_keys )
        let keys_mapping_metadata = arr_decide( endpoint.requires_all_keys )
        const check_keys = ( endpoint, request ) => keys_mapping( Object.keys( request.body ) , endpoint.keys )
        const check_keys_metadata = ( endpoint, request ) => keys_mapping_metadata( Object.keys( request.body ), endpoint.keys )

        return {
                check_keys : check_keys,
                check_keys_metadata : check_keys_metadata
        }
}
