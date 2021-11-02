import express from "express"
var jwt = require('express-jwt');
var jwks = require('jwks-rsa');

export const jwtCheck = jwt({
	secret: jwks.expressJwtSecret({
		cache: true,
		rateLimit: true,
		jwksRequestsPerMinute: 5,
		jwksUri: 'https://dev-xr7t2jq8.us.auth0.com/.well-known/jwks.json'
	}),
	audience: 'http://localhost:9001',
	issuer: 'https://dev-xr7t2jq8.us.auth0.com/',
	algorithms: ['RS256']
});

export default function create_app(){
	const port = process.env.PORT ? process.env.PORT : 8000
	const app = express()
	
	app.use( express.json() )
	app.use

	return app	
}
