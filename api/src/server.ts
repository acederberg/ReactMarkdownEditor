import express from "express"
import cors from "cors"

// should use es6
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

export const jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: process.env.REACT_APP_TOKEN_JWKS_URI
	}),
	audience: process.env.REACT_APP_TOKEN_AUDIENCE,
	issuer: process.env.REACT_APP_TOKEN_ISSUER,
	algorithms: ['RS256']
});

export default function create_app(){
	const port = process.env.PORT ? process.env.PORT : 8000
	const app = express()
	const my_cors = cors()

	app.use( express.json() )
	app.use( my_cors )
	app.options( '*', my_cors )

	/*
	app.use( ( request, result, next ) => { 
		result.header('Access-Control-Allow-Origin', '*')
		result.header('Access-Control-Allow-Headers', 'Authorization, Origin, Content-Type, Accept')
		result.header( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' )
		console.log( request.headers ) 
		next()
	} )
       */

	return app	
}
