// Only a GET route for now.
import { EndpointInterface, EndpointsInterface } from './types'
import { models } from './model'

export const GET : EndpointInterface = {
	keys : [ 'catagory', 'filter' ],
	find : () => {
		

	}
}

const latest : EndpointsInterface = {
	route : '/latest/',
	methods : {
		get : GET
	}
}

export default latest

