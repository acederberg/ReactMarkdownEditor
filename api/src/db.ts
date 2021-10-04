import * as mongoose from 'mongoose'

let connection : mongoose.Connection;

export default function create_db(){
	if ( !process.env.DB_URI ){ throw Error("DB_URI is not defined.") }
	else if ( connection ){ console.log( "Database connection already exists." ) }

	mongoose.connect( process.env.DB_URI )
	connection = mongoose.connection
	return connection
}