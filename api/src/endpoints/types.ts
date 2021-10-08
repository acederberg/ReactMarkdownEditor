import { ContentInterface } from "./models/types"

// Needs to be like content interface so that users don't have to put a contentinterface in the 'content' field but instead on the root level of the json
export const request_keys = [ '_id', 'collection', 'filter', 'max_count', 'random' ]
export interface RequestInterface {
        _id ?: String,
	_ids ?: [ String ],
        collection : String,
	filter ?: ContentInterface,
	max_count ?: Number,
	random ?: Boolean,
	content ?: ContentInterface
}

export const endpoint_keys = [ 'keys', 'optional_keys', 'metadata_keys', 'find', 'clean' ]
export interface EndpointInterface {
	// Keys in request body.
	// Keys will mostly be used in the `find` method.
	keys : Array<String>,
	optional_keys ?: Array<String>,
	metadata_keys ?: Array<String>,
	find : Function,
	clean ?: Function
}

export interface EndpointsInterface {
	route : string,
	methods : Object
}
