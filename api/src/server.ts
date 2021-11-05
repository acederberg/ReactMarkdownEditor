import express from "express"
import cors from "cors"

// should use es6
var jwt = require('express-jwt');
var jwtAuthz = require('express-jwt-authz')
var jwks = require('jwks-rsa');

// Use trivial middleware to avoid using up tokens. 
const TESTING = ( process.env.TESTING === 'true' )
const testing_middleware = ( request, response, next ) => next()

const checkUser =  !TESTING ? jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: process.env.REACT_APP_TOKEN_JWKS_URI
	}),
	audience: process.env.REACT_APP_TOKEN_AUDIENCE,
	issuer: process.env.REACT_APP_TOKEN_ISSUER,
	algorithms: ['RS256']
}) : testing_middleware

const checkAdmin = !TESTING ? jwtAuthz(
	[ "modify:articals" ], 
	{ customScopeKey : "permissions" }
) : testing_middleware

export { checkUser, checkAdmin }
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
