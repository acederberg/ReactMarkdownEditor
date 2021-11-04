import { get_markdown } from '../fetchMarkdown.js'

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
			//repo : ''
		}
	}
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
	const setEffect = ( newEffect ) => {
		effect = newEffect
		// console.log( newEffect )
	}

	return { setAll : setAll, set : set, get : get, getKey : getKey, setEffect : setEffect, effect : effect }
}

export const fetchClosure = ({ _id, collection }, callback ) => {
                return get_markdown({ _id, collection }
                ).then( data => {
                        return createEditorClosure( data ? {
                                body : data.body,
                                metadata : {
                                        active : data.metadata.active,
                                        description : data.metadata.description,
                                        title : data.metadata.title,
                                        tags : data.metadata.tags
                                        //repo : data.metadata.repo
                                }
			} : null )
                } )
                .then( data => ( callback ) ? callback( data ) : data )
}
