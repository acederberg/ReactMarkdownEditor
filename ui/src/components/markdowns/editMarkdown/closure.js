import { get_markdown } from '../fetchMarkdown.js'

const body = "body"
const fields = [ "active", body, "description", "modified", "title", "tags", "repo" ]
const defaults = {
	body : '',
	metadata : {
		active : null,
		description : '',
		title : '',
		tags : [],
	}
}


export default function createEditorClosure( rawData )
{

	var data = rawData ? rawData : defaults
	var effect = ( markdown ) => markdown

	const set = ( key, value ) => {
		if ( !fields.includes( key ) ) return
		else if ( key === body ){
			data[ body ] = value
			effect( data[ body ] )
		}
		else data[ 'metadata' ][ key ] = value
	}
	const setAll = newData => data = newData
	const get = () => data
	const getKey = ( key ) => ( key === 'body' ) ? data[ key ] : data.metadata[ key ] 
	const setEffect = ( newEffect ) => { effect = newEffect }

	return { setAll : setAll, set : set, get : get, getKey : getKey, setEffect : setEffect, effect : effect }

}

function fixData( data )
{
	let output_data, output_metadata ;

	if ( data )
	{
		output_metadata = data.metadata ? {
			active : data.metadata.active,
			description : data.metadata.description,
			title : data.metadata.title,
			tags : data.metadata.tags
		} : defaults.metadata

		output_data = { body : data.body, metadata : output_metadata }
	}

	return output_data

}

export function fetchClosure({ _id, collection }, callback ) 
{

	return get_markdown({ _id, collection })
		.then( fixData )
		.then( data => createEditorClosure( data ? data : null ) )
		.then( data => ( callback ) ? callback( data ) : data )

}
