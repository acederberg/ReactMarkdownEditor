const uri = process.env.REACT_APP_API_URI
const make_uri = ( filename ) => `${ process.env.REACT_APP_API_URI }/${filename}`

const HEADERS = { 'Content-type' : 'application/json' }


function create( fetcher ){
	// Make a function that takes in the same parameters as the fetcher used.
	const wrapper = async ( args, callback ) => {
		const data = await fetcher( args ).then( request => request.json() )
		return callback ? callback( data ) : data
	}
	return wrapper
}

const get_markdown = create( 
	// Get a markdown document.
	( { collection, _id } ) => fetch( `${uri}/markdown/${collection}/${_id}`)
)

const put_markdown = create(
	( { collection, _id, content } ) => fetch( `${uri}/markdown/`, {
		headers : HEADERS,
		body : JSON.stringify({
			collection : collection,
			filter : { _id : _id },
			content : content
		}),
		method : 'PUT'
		}
	)
)

const post_markdown = create( ( { collection, _id, content } ) => fetch( `${uri}/markdown/`, {
		headers : HEADERS,
		body : JSON.stringify( { collection : collection, _id : _id, ...content } ),
		method : 'POST'
	} )
)

const delete_markdown = create( ( { collection, _id } ) => fetch( `${uri}/${collection}/${_id}`, {
		headers : HEADERS,
		body : JSON.stringify( { collection, _id } ),
		method : 'DELETE'
	} )
)

export { make_uri, get_markdown, post_markdown, put_markdown, delete_markdown }

