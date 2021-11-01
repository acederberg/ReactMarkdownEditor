import Inputs from './inputs.js'
import Buttons from './buttons.js'
import { fetchClosure } from './closure.js'
import  RenderMarkdownIntoWrapper from '../renderMarkdown.js'

import { Spinner } from 'evergreen-ui'
import { useEffect, useState } from 'react'

export default function EditMarkdown({ _id, collection }){

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
	return editorClosure ? <>
		<Inputs editorClosure = { editorClosure }/>
		<Buttons 
			editorClosure = { editorClosure }
			_id = { _id }
			collection = { collection }
		/>
		<RenderMarkdownIntoWrapper editorClosure = { editorClosure }/>
	</> : <Spinner/>



}
