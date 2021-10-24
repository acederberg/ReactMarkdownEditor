// Syntax highlighting is verbatim from the docks. https://github.com/remarkjs/react-markdown
import ReactDom from 'react-dom'
import RenderMarkdown from './renderMarkdown.js'
import { get_markdown } from './fetchMarkdown.js'

// Separate from view.js because there are various elements into which markdowns will be rendered.
export default async function ViewMarkdown( collection, _id, into ){
	// Make markdown with highlighyinh as `data`
	const data = await get_markdown( { collection : collection, _id : _id } )
	let markdown = <RenderMarkdown raw_markdown = { data.body }/>
	ReactDom.render( markdown, into )

}
