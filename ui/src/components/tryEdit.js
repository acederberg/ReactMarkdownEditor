import EditMarkdown from './markdowns/editMarkdown'
import { ViewerContext } from './viewerContext.js'
import Navbar from './navbar.js'

import { useContext } from 'react'



// Connects edit markdown to the viewer context.

export default function TryEdit(){
	const value = useContext( ViewerContext )
	const props = value.get()
	return <>
		<Navbar withLogin = { false }/>
		<EditMarkdown { ...props } safe = { true }/>
	</>
}


