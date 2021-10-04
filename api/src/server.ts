import * as express from "express"

export default function create_app(){
	const port = process.env.PORT ? process.env.PORT : 8000
	const app = express()
	app.use( express.json() )
	app.listen( port, () => console.log( `Listening on ${port}.` ) )
	return app	
}
