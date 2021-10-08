// Miscillanious utility endpoints.
import { Connection } from "mongoose"
import { Express } from "express"

export default function extras( app : Express, db : Connection ){
	
	app.get( "/collections/", async ( request, result ) => {
		// List the available collections. 
		const collections = await db.db.listCollections().toArray()
		result.send( collections.map( item => item.name ) )
	} )

}
