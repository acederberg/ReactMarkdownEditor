// Syntax highlighting is verbatim from the docks. https://github.com/remarkjs/react-markdown
import ReactDom from 'react-dom'
import { get_markdown } from './fetchMarkdown.js'
import RenderMarkdownIntoWrapper from './renderMarkdown.js'
import createEditorClosure from './editMarkdown/closure.js'
import { useEffect, useState } from 'react'

const closure = createEditorClosure( '' ) 

export default function ViewMarkdown({ children, collection, _id }){
	// Need state since componentwillmount is non-trivial
	console.log( closure )
	const [ markdown, setMarkdown ] = useState( '' )
	const get_md = async () => {
		const markdown = await get_markdown( { collection : collection, _id : _id } )
		closure.setAll( markdown )
		setMarkdown()
	}
	useEffect( () => get_md(), [] )
	return <RenderMarkdownIntoWrapper editorClosure = { closure } children = { children }/>
}
