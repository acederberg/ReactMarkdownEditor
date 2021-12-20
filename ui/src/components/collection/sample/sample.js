import { Paragraph, Pane, Heading } from "evergreen-ui"
import { useContext } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { ViewerContext } from "../../viewerContext.js"
import SampleWrapper from "./sampleWrapper.js"

const defaults = {
	description : "Could not GET artical. Internal failure or failure within the backend.",
	title : "Failure :("
}

const Sample = ({ _id, author, collection, description, title, size }) => {

	const value = useContext( ViewerContext )
	const { isAuthenticated } = useAuth0()

	const onClick = () => {
		value.set( { _id : _id, collection : collection } ) 
	}

	return <a href = { isAuthenticated ?  '/edit' : `/view/${collection}/${_id}` }>
	<SampleWrapper _key = { _id } size = { size } onClick = { onClick }>
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
		<Paragraph>
			{ author ?? author }
		</Paragraph>
	</SampleWrapper>
	</a>

}
export default Sample

