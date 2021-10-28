import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'


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

const Markdown = ({ markdownClosure }) => {
	// Use state instead
	// Markdown may only be rendered into wrapper. Nothing else should be.
	const [ state, setState ] = useState({})
	markdownClosure.setEffect( markdown => setState() )
	console.log( 'Markdown' )
	return <ReactMarkdown
		children = { markdownClosure.get() }
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
}

export default function RenderMarkdownIntoWrapper({ markdownClosure }){

	console.log( 'RenderMarkdownIntoWrapper' )
	console.log( markdownClosure.get() )
	useEffect( () => {
		const wrapper = document.getElementById( 'wrapper' )
		ReactDOM.render(
			<Markdown markdownClosure = { markdownClosure }/>,
			wrapper
		)
	}, [] )
	
	return <div></div>

}
