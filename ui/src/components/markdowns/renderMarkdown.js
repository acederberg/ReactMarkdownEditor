import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism'

const render_markdown = ({ raw_markdown }) => {
	console.log( raw_markdown )
	return <ReactMarkdown
		children = { raw_markdown }
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

export default render_markdown ;
