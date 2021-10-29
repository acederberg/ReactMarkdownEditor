// Syntax highlighting is verbatim from the docks. https://github.com/remarkjs/react-markdown
import ReactDom from 'react-dom'
import { get_markdown } from './fetchMarkdown.js'
import RenderMarkdownIntoWrapper, { createMarkdownClosure } from './renderMarkdown.js'
import { useEffect, useState } from 'react'

const closure = createMarkdownClosure( '' ) 

export default function ViewMarkdown({ children, collection, _id }){
	// Need state since componentwillmount is non-trivial
	const [ markdown, setMarkdown ] = useState( '' )
	const get_md = async () => {
		const gotMarkdown = await get_markdown( { collection : collection, _id : _id } )
		closure.set( gotMarkdown.body )
		setMarkdown()
	}
	useEffect( () => get_md(), [] )
	console.log( 'ViewMarkdown' )
	return <RenderMarkdownIntoWrapper markdownClosure = { closure } children = { children }/>
}
