import ReactDom from 'react-dom'
import ReactMarkdown from 'react-markdown'

import get_path from './fetchMarkdown.js'


export default async function RenderMarkdown( filename, into ){
	
	const data = await get_path( filename, ( raw_markdown ) => <ReactMarkdown>{ raw_markdown }</ReactMarkdown> )
	ReactDom.render( data, into )

}
