import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState, useEffect } from 'react'
import createEditorClosure from './editMarkdown/closure.js'
import ReactDOM from 'react-dom'

/*
export const createMarkdownClosure = ( initialMarkdown ) => {
	var effect = ( markdown ) => markdown
	var markdown = initialMarkdown
	return {
		get : () => markdown,
		set : ( newMarkdown, callback ) => {
			markdown = newMarkdown
			!!callback && callback( markdown )
			effect( markdown )
		},
		setEffect : ( newEffect ) => effect = newEffect
	}
}
*/

const Markdown = ({ children, editorClosure }) => {
	// Use state instead
	// Markdown may only be rendered into wrapper. Nothing else should be.
	console.log( 'Markdown' )
	const [ state, setState ] = useState( editorClosure.getKey( 'body' ) )
	editorClosure.setEffect( markdown => setState(
			editorClosure.getKey( 'body' ) 
	) )
	return editorClosure ? <>
		{ children }
		<ReactMarkdown
			children = { state
			}
			components = {{
				code({node, inline, className, children, ...props}) {
					const match = /language-(\w+)/.exec(className || '')
					return !inline && match ? (
						<SyntaxHighlighter
							children={String(children).replace(/\n$/, '')}
							style={ solarizedlight}
							language={match[1]}
							PreTag="div"
							{...props}
						/>
						) : (
						<code className={className} {...props}>
							{children}
						</code>
					)
				}
			}}
		></ReactMarkdown>
	</> : <div/>
}

export default function RenderMarkdownIntoWrapper({ children, editorClosure }){

	console.log( 'RenderMarkdownIntoWrapper' )
	console.log( editorClosure )
	useEffect( () => {
		const wrapper = document.getElementById( 'wrapper' )
		ReactDOM.render(
			<Markdown children = { children } editorClosure = { editorClosure }/>,
			wrapper
		)
	}, [] )
	
	return <div></div>

}
