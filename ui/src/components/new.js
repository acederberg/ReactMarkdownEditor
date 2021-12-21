import { useState, useEffect, useContext } from 'react'
import { Heading } from 'evergreen-ui'

import { ViewerContext } from "./viewerContext.js"
import Collection from "./collection"
import Edit from "./edit"
import { fetchCollections } from "./collection"
import { SampleWrapper } from "./collection/sample"


function Sample({ collection, callback })
{
	const values = useContext( ViewerContext )

	return <SampleWrapper onClick = { () => {
		values.set({ collection : collection })  
		callback && callback( collection ) 
	}} _key ={ collection }>
		<Heading>
			{ collection }
		</Heading>
	</SampleWrapper>
}


export default function New()
{

	const [ collection, setCollection ] = useState()
	const SampleWithSetCollection = ({ collection }) => <Sample 
		collection = { collection } 
		callback = { setCollection }
	/>

	return !collection 
		? <Collection CustomItem = { SampleWithSetCollection }/> 
		: <Edit/>

}
