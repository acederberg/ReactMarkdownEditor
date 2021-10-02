const make_uri = ( filename ) => `${ process.env.REACT_APP_API_URI }/${filename}`
const get_markdown = async ( filename, callback ) => {
        const data = await fetch( make_uri( filename ) )
        .then( data => data.text() )
	return callback ? callback( data ) : data
}
const get_markdowns = async ( callback ) => {
	const data = await fetch( make_uri('new/') )
	.then( data => data.json() )
	return callback ? callback( data ) : data
}
const post_markdown = async ( body, callback, override ) => {
	console.log(`body = `,body )
	const response = await fetch( make_uri( 'new/' ), {
		headers : {
			'Content-type' : 'application/json'
		},
		body : JSON.stringify( body ),
		method : ( override ? 'POST' : 'PUT' )
		}
	)
	return callback ? callback( response ) : response 
}
const delete_markdown = async ( { target }, callback ) => {
	const response = await fetch( make_uri( 'new/' ), {
		headers : {
			'Content-type' : 'application/json'
		},
		body : JSON.stringify({ target : target }),
		method : 'DELETE'
	} )
}
export { make_uri, get_markdown, get_markdowns, post_markdown, delete_markdown }
export default get_markdown;

