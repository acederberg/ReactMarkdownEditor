import { EndpointInterface } from './types'
import { metadata_keys } from './model/types'
import { Collection } from 'mongoose'

export const markdown_get : EndpointInterface = {
	keys : [ '_id', 'collection' ],
	find : function ( collection : Collection , raw : Object ){
		collection.find( raw )
		return raw
	}
}
export const markdown_post : EndpointInterface = {
	//keys : metadata_keys,
	keys : [ "body", "collection", "metadata" ],
	find : function ( collection : Collection , raw : Object ){
		//collection.create( raw )		
		console.log( `collection = ${ collection }` )
		return raw
	} 
}
/*
export const markdown_delete : EndpointInterface = {

}
export const markdown_put : EndpointInterface = {


}
*/
