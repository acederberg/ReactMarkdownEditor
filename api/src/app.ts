import create_app from './server'
import create_db from './db'
import models from './model/model'

const app = create_app()
const db = create_db()

const markdown = '/markdown/'
const collection = 'collection'

const get_model = ( request ) => models[ request.body.collection ]
const get_err = ( err, result ) => result.status( 400 ) && result.send( err ) 
const has_key = ( key, request, result ) => !request.body.hasOwnProperty( '_id' ) && get_err( 'InsufficientKeys', result )

app.post(markdown, async ( request, result ) => {
	const model = await get_model( request )
	if ( !model ){ get_err( "ModuleNotFound", result ) }

	const data = await get_model( request ).create( request.body )
	result.send( data )
} )
app.get(markdown, async ( request, result ) => {
	// Otherwise, find the data in the specific collection with the specific filtering statements.
	// If fails, get_err will handel it and return the error.
	const model = await get_model( request )
	if ( !model ){ 
		get_err( "ModuleNotFound", result ) 
		return
	}
	console.log( model )	
	model.find( request.body )
	.then( data => result.send( data ) )
	.catch( err => get_err( err, result ) )
} )
app.delete( markdown, async ( request, result ) => {
	// Should only be able to delete from id.
	// Does not take filtering statements or any other parameters.
	
	const model = await get_model( request )
	if ( !model ){ 
		get_err( "ModuleNotFound", result ) 
		return
	}

	model.find( request.body )
	.then( data => { data.map( item => item.delete() ); return data } ) 
	.then( data => { result.send( data ) } )
	.catch( err => get_err( err, result ) )
} )
