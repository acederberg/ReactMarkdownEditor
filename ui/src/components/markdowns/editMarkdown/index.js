import Inputs from './inputs.js'
import Buttons from './buttons.js'
import createEditorClosure from './closure.js'
import { get_markdown } from '../fetchMarkdown.js'

import { Spinner } from 'evergreen-ui'
import { useEffect, useState } from 'react'

const fetchClosure = ({ _id, collection }, callback ) => {
		return get_markdown({ _id, collection }
		).then( data => { 
			console.log( _id, collection )
			return createEditorClosure( {
				body : data.body,
				metadata : {
					active : data.metadata.active,
					description : data.metadata.description,
					title : data.metadata.title,
					tags : data.metadata.tags,
					repo : data.metadata.repo
				}
			} ) 
		} )
		.then( data => ( console.log( data ) || callback ) ? callback( data ) : data )
}


export default function EditMarkdown({ _id, collection }){

	const [ editorClosure, setEditorClosure ] = useState()
	useEffect( 
		() => fetchClosure({ 
				_id : _id, 
				collection : collection 
			},
			setEditorClosure
		), [] 
	)
	console.log( editorClosure )
//		<View editorClosure = { editorClosure }/>
	return editorClosure ? <>
		<Inputs editorClosure = { editorClosure }/>
		<Buttons editorClosure = { editorClosure }/>
	</> : <Spinner/>



}
