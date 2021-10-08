import request from 'supertest'
import app from '../src/app'

describe( "Test extras.", () => {
	it( "Get a list of collections available", () => request( app )
	   	.get( "/collections/" )
		.expect( 200 )
		.then( response => expect( response.body ).toEqual( expect.arrayContaining([ String ]) ) )
	)
} )
