import EditMarkdown from './markdowns/editMarkdown'
import { ViewerContext } from './viewerContext.js'
import Navbar from './navbar.js'
import Static from './static.js'

import { useContext } from 'react'



// Connects edit markdown to the viewer context.

export default function Edit(){
	const value = useContext( ViewerContext )
	const props = value.get()
	return props ? <>
		<Navbar withLogin = { true }/>
		<EditMarkdown { ...props }/>
	</> : <Static title = 'BadEditor'>
}


