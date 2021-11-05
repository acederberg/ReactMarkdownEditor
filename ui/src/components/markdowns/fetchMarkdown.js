const uri = process.env.REACT_APP_API_URI

const HEADERS = { 
	'Content-type' : 'application/json',
	'Sec-Fetch-Mode' : 'no-cors'
}
const createAuthHeader = async ( token_promise ) => { 
	const token = await token_promise; 
	const header = { ...HEADERS, Authorization : `Bearer ${token}` }
	return header
}

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
		console.log( args )
		const data = await fetcher( args )
			.then( request => request.body ? request.json() : {} )
			.catch( err => console.log( err ) )
		return callback ? callback( data ) : data 
	}
	return wrapper
}

export const get_markdown = create( 
	// Get a markdown document.
	( { collection, _id } ) => fetch( `${uri}/markdown/${collection}/${_id}` )
)

export const put_markdown = create( async function( { collection, filter, content, token } ){
		const headers = await createAuthHeader( token )
		fetch( `${uri}/markdown/`, {
			headers : headers,
			body : JSON.stringify({
				collection : collection,
				filter : filter,
				content : content
			}),
			method : 'PUT'
		} )
	} ) 


export const post_markdown = create( async function( { collection, content, token } ){

	const headers = await createAuthHeader( token )
	fetch( `${uri}/markdown/`, {
		headers : headers,
		body : JSON.stringify( { collection : collection, ...content } ),
		method : 'POST'
	} )

} )

export const delete_markdown = create( async function( { collection, _id, token } ){

	const headers = await createAuthHeader( token )
	fetch( `${uri}/markdown`, {
		headers : headers,
		body : JSON.stringify( { collection : collection, _ids : [ _id ] } ),
		method : 'DELETE'
	} )
} )


