const body = "body"
const fields = [ "active", body, "description", "modified", "title", "tags", "repo" ]

export default function createEditorClosure( rawData ){
	var data = rawData ? rawData : {
		body : '',
		metadata : {
			active : null,
			description : '',
			title : '',
			tags : [],
			repo : ''
		}
	}

	const set = ( key, value ) => {
		console.log( fields.includes( key ) )
		if ( !fields.includes( key ) ) return
		else if ( key === body ) data[ body ] = value
		else data[ 'metadata' ][ key ] = value
	}

	const get = () => data
	return { set : set, get : get }
}
