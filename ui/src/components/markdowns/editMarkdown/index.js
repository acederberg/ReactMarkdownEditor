import Inputs from './inputs.js'
import Buttons from './buttons.js'
import { fetchClosure } from './closure.js'
import  RenderMarkdownIntoWrapper from '../renderMarkdown.js'

import { Spinner, Pane } from 'evergreen-ui'
import { useEffect, useState } from 'react'

// Creates an editor closure and uses it as state.
// Renders some children that can use the collection, _id, and closure.
// This is a case where using typescript would be helpful.
export function WithMarkdown({ _id, collection, Etc }){

	console.log( 'rendering;' )
	const [ editorClosure, setEditorClosure ] = useState()
	const getEditorClosure = () => fetchClosure({ 
			_id : _id, 
			collection : collection 
		},
		setEditorClosure
	)
	useEffect( getEditorClosure, [] )
	if ( !!editorClosure ) console.log( editorClosure.get() )
	return editorClosure ? <>{ Etc( 
			editorClosure, 
			collection, 
			_id 
		) }
		<RenderMarkdownIntoWrapper editorClosure = { editorClosure }/></>
	: <Spinner/>

}

// The editor.
export default function Export({ _id, collection }){
	const Controls = ( editorClosure, collection, _id ) => {
		return <> 
			<Inputs editorClosure = { editorClosure }/>
			<Buttons 
				editorClosure = { editorClosure }
				_id = { _id }
				collection = { collection }
			/>
		</>
	}
	return <WithMarkdown _id = { _id } collection = { collection } Etc = { Controls }/>
}


