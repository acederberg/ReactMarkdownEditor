import express from "express"
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
	
	app.use( express.json() )
	/*
	app.use( ( request, result, next ) => { 
		console.log( request.headers ) 
		next()
	} )
       */

	return app	
}
