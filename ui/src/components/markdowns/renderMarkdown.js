import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { useState } from 'react'
import ReactDOM from 'react-dom'


export const createMarkdownClosure = ( initialMarkdown ) => {
	var callback = ( markdown ) => markdown
	var markdown = initialMarkdown
	return {
		get : () => markdown && callback( markdown ),
		set : ( newMarkdown ) => markdown = newMarkdown,
		setSetCallback : ( newCallback ) => callback = newCallback 
	}
}

const Markdown = ({ markdownClosure }) => {
	// Use state instead
	// Markdown may only be rendered into wrapper. Nothing else should be.
	const [ markdown, setMarkdown ] = useState( markdownClosure.get() )
	markdownClosure.setSetCallback( setMarkdown )

	return <ReactMarkdown
		children = { markdown }
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

export default function renderMarkdownIntoWrapper( markdownClosure ){

	const wrapper = document.getElementById( 'wrapper' )
	ReactDOM.render(
		<Markdown markdownClosure = { markdownClosure }/>,
		wrapper
	)

}
