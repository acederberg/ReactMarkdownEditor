// Syntax highlighting is verbatim from the docks. https://github.com/remarkjs/react-markdown

import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import get_path from './fetchMarkdown.js'


export default async function ViewMarkdown( filename, into ){
	// Get data. Make markdown with highlighyinh
	const data = await get_path( filename, ( raw_markdown ) => <ReactMarkdown
		components={{
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
		children = { raw_markdown }
	></ReactMarkdown>,

	)
	ReactDom.render( data, into )

}
