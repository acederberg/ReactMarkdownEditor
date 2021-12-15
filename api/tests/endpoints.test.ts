 import request from 'supertest'
import app from '../src/app'
import { content_endpoints as endpoints } from '../src/endpoints'

const id = '_id'
let ids ;
const test_articles = 'test_articles'

console.log( endpoints.route )

describe( "Testing the /markdowns/ endpoint.", () => {

	it( "Empty post should return nothing", () => {
		return request( app ).post( endpoints.route )
		.expect( 400 )
	} )


	// Post data
	let k : number = 0

	while( k < 10){

		it( "Loading tests...", () => {
			
			const data = {
				body : `# Test ${k}`,
				collection : test_articles,
				metadata : {
					author : 'sum dood',
					title : 'sum thing',
					description : 'whatevwer'
				}
			} 

			const result = request( app )
				.post( endpoints.route )
				.send( data )

			console.log( result )

			return result
				.expect( 200 )

		} )

		k = k + 1

	}

	/*it( "Getting an id from the tests collection", () => {
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
							title : expect.any( String ),
							tags : [],
							repo : [],
							modified : [],
							description : expect.any( String ),
							created : expect.any( Date ),
							author : expect.any( String )
						} )
					} )
				] )
			)
		} )
	} )*/


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
		body[ 'collection' ] = 'python_articles'
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
		return request( app )
			.post( endpoints.route )
			.send( body )
			.expect( 200 )

	} )


	it( "Posting to 'main_articles' for the extra_endpoints tests.", () => request( app )
		.post( endpoints.route )
		.send({
			body : '#About',
			collection : 'main_articles',
			metadata : {
				author : 'tester',
				description : 'Test about page.',
				title : 'About'
			}
		})
		.expect( 200 )
	)


	it( "Sending a GET request to clean up tests", () => request( app ).get( endpoints.route )
		.send( { collection : test_articles, max_count : 1000 } )
		.expect( 200 ) 
		.then( request => { ids = request.body.map( item => item._id ); return true } )
	)


	it( "Sending a DELETE request to clean up tests.", () => {
		console.log( ids )
		return request( app ).get( endpoints.route )
	   	.send( { collection : test_articles, _ids : ids } )
		.expect( 200 )
	} )


	it( "Sending a GET request to make sure the tests were actually destroyed.", () => {
		return request( app ).get( endpoints.route )
		.send( { collection : test_articles, max_count : 10 } )
		.expect( 200 )
		.then( request => !request.body )
	} )
  

} )



describe( "Testing extra endpoints.", () => {
	
	it( "Testing '/markdown/:collection/:id/ with bad collection and ids.", () => request( app )
		.get( '/markdown/tetht_ourticuls/1' )
		.expect( 400 )
	)
	

	it( "Testing '/markdown/:collection/:id/ with bad id.", () => request( app )
		.get( `/markdown/${test_articles}/1` )
		.expect( 500 )
	)


	/*
	it( "Testing '/markdown/:collection/:id/ with good parameters", () => request( app )
		.get( '' )
		.expect( 200 )
	)
       */


	it( "Testing '/collections/:collection/:count/'", () => request( app )
		.get( '/collections/test_articles/10' )
		.expect( 200 )
	)


	it( "Testing '/resources/:title/'", () => request( app )
		.get( '/resources/about' )
		.expect( 200 )
	)



} )
