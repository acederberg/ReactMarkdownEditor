const make_path = ( filename ) => `${ process.env.REACT_APP_API_URI }/${filename}`
const get_markdown = async ( filename, callback ) => {

        const data = await fetch( make_path( filename ) )
        .then( data => data.text() )

	return callback ? callback( data ) : data

}
export default get_markdown;
