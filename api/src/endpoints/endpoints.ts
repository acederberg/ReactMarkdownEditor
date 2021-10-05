import { EndpointInterface } from './types'
import { Collection } from 'mongoose'

export const markdown_get : EndpointInterface = {
	keys : [ '_id', 'collection' ],
	find : function ( collection : Collection , raw : Object ){
		collection.find( raw )
		return 
	}
}
/*
export const markdown_post : EndpointInterface = {

}
export const markdown_delete : EndpointInterface = {

}
export const markdown_put : EndpointInterface = {


}
*/
