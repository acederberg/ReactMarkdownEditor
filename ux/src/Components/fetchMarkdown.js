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
export { make_uri, get_markdown, get_markdowns }
export default get_markdown;

