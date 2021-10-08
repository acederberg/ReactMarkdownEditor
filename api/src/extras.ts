// Miscillanious utility endpoints.
import { listCollections } from "./db"
import { Express } from "express"

export default function extras( app : Express ){
	
	app.get( "/collections/", async ( request, result ) => {
		// List the available collections. 
		// Collection creation/deleltion must be done by modifying the `models` folder for now. 
	        // Soon this will be upgraded to a full route and the list of collections will actualy be defined by mongo.
		const collections = await listCollections()
                result.send( collections )
	} )

}
