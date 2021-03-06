import Inputs from './inputs.js'
import Buttons from './buttons.js'
import { fetchClosure } from './closure.js'
import  RenderMarkdownIntoWrapper from '../renderMarkdown.js'
import CenteredSpinner from '../../centeredSpinner.js'

import { Pane } from 'evergreen-ui'
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
	: <CenteredSpinner/>

}


// The editor.
export default function Edit({ _id, collection, safe })
{
	console.log( safe )
	const Controls = ( editorClosure, collection, _id ) => {
		return <>
		<Pane style = {{ background : '#FFFFFF' }} padding = { 16 } paddingBottom = { 64 }>
			<Inputs editorClosure = { editorClosure }/>
			<Buttons 
				editorClosure = { editorClosure }
				_id = { _id }
				collection = { collection }
				safe = { safe }
			/>
		</Pane>
		<Pane style = {{ background : '#FFFFFF' }} align = 'center' elevation = {1}>
		</Pane>
		</>
	}

	return <WithMarkdown _id = { _id } collection = { collection } Etc = { Controls }/>

}


