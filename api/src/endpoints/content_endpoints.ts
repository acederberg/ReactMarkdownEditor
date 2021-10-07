import { EndpointsInterface, EndpointInterface, RequestInterface } from './types'
import { metadata_keys } from './model/types'

const id = '_id'
const collection = 'collection'
const filter = 'filter'
const max_count = 'max_count'
const msg = a_msg => { return { msg : a_msg } }

const GET : EndpointInterface = {
	keys : [ '_id', 'collection', 'max_count' ],
	find : function ( model : any , raw : RequestInterface ){
		if ( raw[ 'id' ] !== undefined ){
			return model.findById( raw[ id ] )
		}
		else if ( raw[ 'max_count' ] !== undefined ){
			return model.find( raw.filter ).limit( raw[ 'max_count' ] )
		}
		else {
			return model.find( raw.filter ) //.filter( raw.filter )
		}
	}
}
const POST : EndpointInterface = {
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
const DELETE : EndpointInterface = {
	// Doesnt require all keys since in this case it is good enough (and more efficient) to see if id is in the request. In such a case the intersection is nonempty.
	keys : [ id ],
	requires_all_keys : false,
	find : function ( model : any , raw : RequestInterface ){
		return model.findByIdAndDelete( raw[ id ] )
	}
}
const PUT : EndpointInterface = {
	// only supports overriding content.
	keys : [ id, "filter", "content" ],
	requires_all_keys : false,
	find : function ( model : any, raw : RequestInterface ){
		const content = raw[ "content" ]
		if ( !content ){ 
			return msg( "Model not found" )
		}
		else if ( raw[ id ] ){
			return model.findByIdAndUpdate( raw[ id ], )
		}
		else if ( raw[ filter ] ){
			return model.updateMany( raw.filter, { $set : content } )
			.count( raw[ max_count ] ? raw[ max_count ] : null )
		}
		else{
			return msg( "Endpoint undefined" )
		}
	}
}

const endpoints : EndpointsInterface = {
	route : "/markdown/",
	methods : {
		get : GET,
		put : PUT,
		post : POST,
		delete : DELETE
	}
} ;
export default endpoints ;

