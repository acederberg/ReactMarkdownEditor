import mongoose from 'mongoose'

let connection : mongoose.Connection;

export const db_uri_undefined = "DB_URI is not defined"

export default function create_db()
{

	return create_db_from_uri( process.env.DB_URI )

}


export function create_db_from_uri( db_uri : string )
{

	if ( !db_uri ){ throw Error( db_uri_undefined ) }
	else if ( connection ){ console.log( "Database connection already exists." ) }

	mongoose.connect( db_uri )
	connection = mongoose.connection
	return connection
	
}


export const listCollections = async () => {

	const collections = await connection.db.listCollections().toArray()
	return collections.map( item => item.name )

}
