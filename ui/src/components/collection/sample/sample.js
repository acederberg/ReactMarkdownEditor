import { Paragraph, Pane, Heading } from "evergreen-ui"
import { useHistory } from 'react-router-dom'
import { useState, useContext } from 'react'

import { ViewerContext } from "../../viewerContext.js"

const defaults = {
	description : "Could not GET artical. Internal failure or failure within the backend.",
	title : "Failure :("

}
const Sample = ({ _id, author, collection, description, title }) => {

	const value = useContext( ViewerContext )
	const history = useHistory()
	console.log( history )
	return <Pane 
		key = { _id } 
		background = "gray100" 
		padding = {16} 
		margin = {8} 
		width = {240} 
		height = {240} 
		style = {{ display : 'inline-block' }} 
		onClick = {
			() => value.set( {
				_id : _id, 
				collection : collection 
			} )/* || history.push*/
		}
	>
		<Heading size = { 600 }>
			{ 
				title ? description : defaults.title
			}
		</Heading>
		<Paragraph>
			{ 
				description ? description : defaults.description
			}
		</Paragraph>
	</Pane>
}
export default Sample

