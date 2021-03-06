import { EndpointsInterface, EndpointInterface, RequestInterface } from './types'
import { ContentInterface } from './model/types'
import { metadata_keys } from './model/types'
import { checkUser, checkAdmin } from "../server"

const DEFAULT_MAX_COUNT = 5

const id = '_id'
const ids = '_ids'
const collection = 'collection'
const filter = 'filter'
const max_count = 'max_count'
const msg = ( a_msg ) => { return { msg : a_msg } }

const get_max_count = ( raw ) => {
	        const max_count = raw[ 'max_count' ]
		return max_count ? max_count : DEFAULT_MAX_COUNT
}

const GET : EndpointInterface = {

	// Would be better to have required keys and optidnal keys.
	// max_count should be optional. Added them and it works great
	// _id option is not needed, just use the filter.
	
	keys : [ 
		'filter', 
		'collection' 
	],
	middleware : [ checkAdmin ], // Using this because this endpoint is private.
	optional_keys : [ 'max_count' ],
	find : function ( model : any , raw : RequestInterface )
	{
		const max_count = get_max_count( raw )
		return model.find( raw.filter ).limit( max_count ).exec()
	}

}


const POST : EndpointInterface = {
	
	//keys : metadata_keys,
	
	keys : [ 
		"body", 
		"collection", 
		"metadata" 
	],
	metadata_keys : [ 
		"title", 
		"description", 
		"author" 
	],
	middleware : [ checkUser, checkAdmin ],
	find : function ( model : any , raw : RequestInterface )
	{
		// Ensure that the data has the correct shape.
		const now = new Date() 
		let processed : ContentInterface = {
			body : raw[ 'body' ],
			metadata : { active : true, created : now, ...raw[ 'metadata' ] }
		}
		// Instantiate a model. Call the `.save` method to make it exist.
		const posted = new model( processed )
		const saved = posted.save().then( result => { console.log( result ); return result } )

		return saved
	} 

}


const DELETE : EndpointInterface = {
	keys : [ 
		"collection", 
		ids 
	],
		middleware : [ 
		checkUser, 
		checkAdmin 
	],
	find : async function ( model : any , raw : RequestInterface ){
		console.log( 'DELETEing' )
		const out = raw[ ids ].map( an_id => model.findOneAndDelete({ _id : an_id }).exec() )
		console.log( out )
		return out
		return msg( "Deleted content." )
	}

}


const PUT : EndpointInterface = {
	// only supports overriding content.
	keys : [ 
		"filter", 
		"content" 
	],
	middleware : [ 
		checkUser, 
		checkAdmin 
	],
	optional_keys : [ "max_count" ],
	find : function ( model : any, raw : RequestInterface )
	{
		const content : ContentInterface = raw[ "content" ]
		if ( !content ){ 
			return msg( "NoContent" )
		}
		else if ( raw[ filter ] ){
			const max_count = get_max_count( raw )
			// Cannot apply these updates simultaniously, since metadata is reassigned as a whole and not field ny field
			return ( async () => {
				await model.updateMany( raw.filter, { $set : content } ).limit( max_count )
				model.updateMany( raw.filter, {
					$push : { 
						'metadata.modified' : Date(),
					}
				} ).limit( max_count )
			} )()
			
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
} 


export default endpoints ;

