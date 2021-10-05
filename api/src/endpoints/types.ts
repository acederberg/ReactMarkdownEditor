import { ContentInterface } from "./models/types"

export const request_keys = [ '_id', 'collection', 'filter', 'max_count', 'random' ]
export interface RequestInterface {
        _id ?: String,
        collection : String,
	filter ?: ContentInterface,
	max_count ?: Number,
	random ?: Boolean
}

export const endpoint_keys = [ 'keys', 'find', 'clean' ]
export interface EndpointInterface {
	// Keys in request body
	keys : Array<String>,
	find : Function,
	clean ?: Function
}
