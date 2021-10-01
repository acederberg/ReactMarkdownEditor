// Syntax highlighting is verbatim from the docks. https://github.com/remarkjs/react-markdown

import ReactDom from 'react-dom'
import RenderMarkdown from './RenderMarkdown.js'
import get_path from './fetchMarkdown.js'
export default async function ViewMarkdown( filename, into ){
	// Make markdown with highlighyinh as `data`
	const data = await get_path( filename )
	let markdown = <RenderMarkdown raw_markdown = { data }/>
	ReactDom.render( markdown, into )

}
