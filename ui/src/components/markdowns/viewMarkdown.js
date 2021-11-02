// Syntax highlighting is verbatim from the docks. https://github.com/remarkjs/react-markdown
import ReactDom from 'react-dom'
import { get_markdown } from './fetchMarkdown.js'
//import RenderMarkdownIntoWrapper from './renderMarkdown.js'
//import createEditorClosure from './editMarkdown/closure.js'
//import { useEffect, useState } from 'react'
import { WithMarkdown } from './editMarkdown'
//import { Spinner } from 'evergreen-ui'


//const closure = createEditorClosure( '' ) 

export default function ViewMarkdown({ collection, _id }){
	// Need state since componentwillmount is non-trivial
/*	console.log( 'ViewMarkdown' )
	const [ editorClosure, setEditorClosure ] = useState()
	const get_md = async () => fetchClosure({
			_id : _id,
			collection : collection
		},
		setEditorClosure
	)
	
	useEffect( () => get_md(), [] )
	return editorClosure ? <RenderMarkdownIntoWrapper 
		editorClosure = { closure } 
		children = { children }
	/> : <Spinner/>
	*/
	const Etc = ( editorClosure, collection, _id ) => {
		return <div></div>
	}
	return <WithMarkdown _id = { _id } collection = { collection } Etc = { Etc }/>
}
