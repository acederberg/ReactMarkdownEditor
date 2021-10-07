import request from 'supertest'
import app from '../src/app'
import { content_endpoints as endpoints } from '../src/endpoints'

const id = '_id'

const get_ids = () => request( app )
.get( '/markdown/' )
.then( request => request.body )
.then( data => data.map( item => item[ id ] ) )

describe( "Testing the /markdowns/ endpoint.", () => {
	let random_id ;
	it( "Empty post should return nothing", () => {
		return request( app ).post( endpoints.route )
		.expect( 400 )
	} )
	// Post data
	let k : number = 0
	while( k < 10){
		it( "Loading tests...", () => {
			return request( app ).post( endpoints.route )
			.send( {
				body : `# Test ${k}`,
				metadata : {
					author : 'sum dood',
					title : 'sum thing',
					description : 'whatevwer'
				}
			} )
			expect( 200 )
		} )
		k = k + 1
	}
	it( "Getting an id from the tests collection", () => {
		return request( app ).get( endpoints.route )
		.send({ collection : 'tests', 'max-count' : 1 })
		.expect( 200 )
		.then( ( response ) => {
			return expect( response.body ).toEqual( 
				expect.arrayContaining([
					expect.objectContaining({ 
						_id : expect.any( String ),
						body : expect.any( String ),
						metadata : expect.objectContaining( {
							author : expect.any( String ),
							title : expect.any( String ),
							description : expect.any( String )
						} )
					} )
				] )
			)
		} )
	} )
	it( "Testing GET /markdowns/ with no args", () => {
		return request( app ).get( endpoints.route )
		.send()
		.expect( 400 )
	} )
	let body = {}
	let metadata = { description : 'yet another test' }
	const attempt = () => { 
		console.log( body )
		return request( app ).post( endpoints.route ).send( body ).expect( 400 )
	}
	it( "Testing POST /markdowns/ without metadata", () => {
		body[ 'body' ] = '# Test'
		body[ 'collection' ] = 'python'
		return attempt()
	} )
	it( "Testing POST /markdowns/ with only bad metadata", () => {
		const result = request( app ).post( endpoints.route )
		.send({ metadata : metadata }).expect( 400 )
		return result
	} )
	it( "Testing POST /markdowns/ with all top level fields and bad metadata", () => {
		// All top level fields, insufficient metadata
		body[ 'metadata' ] = metadata
		attempt()
	} )
	it( "Testing POST /markdowns/ with all fields", () => {
		metadata[ 'author' ] = 'tstr'
		metadata[ 'title' ] = 'the best test'
		return request( app ).post( endpoints.route ).send( body ).expect( 200 )

	} )
} )

describe( "Testing the /metadata/ endpoint/", () => {
	it( "Testing GET /metadata/", () => {
			

	})
} )
