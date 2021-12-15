import { default as create_db, create_db_from_uri, db_uri_undefined, listCollections } from '../src/db'


describe(
	"Create_db unit tests.",
	function(){

		it( 
			"Make sure that it can run without failing. If it does, check package.json and .env.dev.", 
			() => expect( create_db() )
				.not
				.toBeNull()
		)

		
		it(

			"Should fail when db_uri is not defined.",
			() => expect( () => create_db_from_uri( '' ) )
				.toThrow( db_uri_undefined )

		)

	}
)
