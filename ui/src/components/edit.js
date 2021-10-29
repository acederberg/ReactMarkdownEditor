import EditMarkdown from './markdowns/editMarkdown'
import { ViewerContext } from './viewerContext.js'
import { useContext } from 'react'

// Connects edit markdown to the viewer context.

export default function Edit(){
	const value = useContext( ViewerContext )
	return <EditMarkdown { ...value.get() }/>
}
