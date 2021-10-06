import express from "express"

export default function create_app(){
	const port = process.env.PORT ? process.env.PORT : 8000
	const app = express()
	app.use( express.json() )
	return app	
}
