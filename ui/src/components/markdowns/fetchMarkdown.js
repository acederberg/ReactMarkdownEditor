const uri = process.env.REACT_APP_API_URI

const HEADERS = { 'Content-type' : 'application/json' }

export function clean( data ){
	return {
		body : data.body,
		metadata : {
			author : data.metadata.author,
			description : data.metadata.description,
			title : data.metadata.title
		}
	} 
}

function create( fetcher ){
	// Make a function that takes in the same parameters as the fetcher used.
	const wrapper = async ( args, callback ) => {
		const data = await fetcher( args ).then( request => request.json() ).catch( err => console.log( err ) )
		return callback ? callback( data ) : data
	}
	return wrapper
}

export const get_markdown = create( 
	// Get a markdown document.
	( { collection, _id } ) => fetch( `${uri}/markdown/${collection}/${_id}` )
)

export const put_markdown = create(
	( { collection, filter, content } ) => fetch( `${uri}/markdown/`, {
		headers : HEADERS,
		body : JSON.stringify({
			collection : collection,
			filter : filter,
			content : content
		}),
		method : 'PUT'
		}
	)
)

export const post_markdown = create( ( { collection,  content } ) => fetch( `${uri}/markdown/`, {
		headers : HEADERS,
		body : JSON.stringify( { collection : collection, ...content } ),
		method : 'POST'
	} )
)

export const delete_markdown = create( ( { collection, _id } ) => fetch( `${uri}/markdown`, {
		headers : HEADERS,
		body : JSON.stringify( { collection : collection, _ids : [ _id ] } ),
		method : 'DELETE'
	} )
)


