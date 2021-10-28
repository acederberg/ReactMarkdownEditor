import { Paragraph, Pane, Heading } from "evergreen-ui"
import { Redirect } from 'react-router-dom'
import { useState, useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { ViewerContext } from "../../viewerContext.js"
import { history } from "../../../AuthProviderWithHistory.js"

const defaults = {
	description : "Could not GET artical. Internal failure or failure within the backend.",
	title : "Failure :("

}
const Sample = ({ _id, author, collection, description, title }) => {

	const value = useContext( ViewerContext )
	const { isAuthenticated } = useAuth0()
	const [ state, setState ] = useState({ selected : false }) 

	const onClick = () => {
		value.set( { _id : _id, collection : collection } ) 
		setState({ selected : true })
	}
	return <a href = { isAuthenticated ?  '/edit' : `/view/${collection}/${_id}` }>
	<Pane 
		key = { _id } 
		background = "gray100" 
		padding = {16} 
		margin = {8} 
		width = {240} 
		height = {240} 
		style = {{ display : 'inline-block' }} 
		onClick = { onClick }
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
	</a>
}
export default Sample

