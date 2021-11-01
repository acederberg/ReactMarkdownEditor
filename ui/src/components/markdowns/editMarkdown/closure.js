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

	const set = ( key, value ) => {
		if ( !fields.includes( key ) ) return
		else if ( key === body ) data[ body ] = value
		else data[ 'metadata' ][ key ] = value
	}

	const get = () => data
	const getKey = ( key ) => ( key === 'body' ) ? data[ key ] : data.metadata[ key ] 

	return { set : set, get : get, getKey : getKey  }
}

export const fetchClosure = ({ _id, collection }, callback ) => {
                return get_markdown({ _id, collection }
                ).then( data => {
                        console.log( data )
                        return createEditorClosure( {
                                body : data.body,
                                metadata : {
                                        active : data.metadata.active,
                                        description : data.metadata.description,
                                        title : data.metadata.title,
                                        tags : data.metadata.tags
                                        //repo : data.metadata.repo
                                }
                        } )
                } )
                .then( data => ( callback ) ? callback( data ) : data )
}
