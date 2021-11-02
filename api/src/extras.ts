// Miscillanious utility endpoints.
import { models } from "./endpoints/model/"
import { jwtCheck } from "./server"
import mongoose from "mongoose"
import { listCollections } from "./db"
import { Express } from "express"
		
const get_name = ( request ) => request.params.collection 

export default function extras( app : Express ){
	app.get( "/collections/", async ( request, result ) => {
		// List the available collections. 
		// Collection creation/deleltion must be done by modifying the `models` folder for now. 
	        // Soon this will be upgraded to a full route and the list of collections will actualy be defined by mongo.
		const collections = await listCollections()
                result.send( collections )
	} )
	app.get( "/markdown/:collection/:_id/", jwtCheck, async( request, result ) => {
		// Get a markdown and its metadata provided a collection and _id
		// Doing this because there are some stupid things about http. Read [ this ]( https://github.com/whatwg/fetch/issues/551 ).
		const name = get_name( request )
		const collection = models[ name ]
		if ( collection ){
			console.log( collection )
			try{
				console.log( request.params._id )
				let id = new mongoose.Types.ObjectId( request.params._id )
				const data = await collection.findOne( { _id : id } )
				console.log( data )
				data ? result.send( data ) : ( 
					result.status( 400 ) && result.send()
				)
			}
			catch( err ){
				result.status( 500 )
				result.send({ msg : String( err ) })
			}
		}
		else {
			result.status( 400 )
			result.send( { 'msg' : 'Failed to find collection' } )
		}
	} )
	app.get( "/collections/:collection/:count/", async( request, result ) => {
		// Get metadata for front end rendering.
		const name = get_name( request ) 
		const count = parseInt( request.params.count ) 
		const collection = models[ name ]
	        if ( collection ){
			var out = {}
			try{
				const data = await collection.find().exec()
				await data.map( item => out[ item._id ] = item.metadata )
				result.send( out )
			}
			catch( err ){
				result.status( 500 )
				console.log( err )
				result.send({ msg : err })
			}
		}
		else {
			result.status( 400 )
			result.send( { msg : 'Failed to find collection' } )
		}
	} )
}
