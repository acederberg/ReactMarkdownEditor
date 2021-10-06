import { EndpointInterface, RequestInterface } from './types'
import { metadata_keys } from './model/types'
import { content_model } from './model/model'

export const markdown_get : EndpointInterface = {
	keys : [ '_id', 'collection', 'all' ],
	find : function ( model : any , raw : RequestInterface ){
		return model.find() //.filter( raw.filter )
	}
}
export const markdown_post : EndpointInterface = {
	//keys : metadata_keys,
	keys : [ "body", "collection", "metadata" ],
	requires_all_keys : true,
	metadata_keys : [ "title", "description", "author" ],
	requires_all_metadata_keys : true,
	find : function ( model : any , raw : RequestInterface ){
		const posted = new model( raw )
		return posted.save()
	} 
}
export const markdown_all : EndpointInterface = {
	keys : [],
	find : function ( model : any, raw : RequestInterface ){
		return model.find()
	}
}
/*
export const markdown_delete : EndpointInterface = {

}
export const markdown_put : EndpointInterface = {


}
*/
