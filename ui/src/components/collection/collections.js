import fetchCollections from "./fetchCollections"
import Samples from "./sample"
import SamplesWrapper from "./sample/samplesWrapper.js"
import Navbar from "../navbar.js"
import CenteredSpinner from "../centeredSpinner.js"

import { Pane } from "evergreen-ui"
import { useState, useEffect } from "react"

const DefaultItem = ({collection}) => <Samples 
	collection = { collection } 
	key = { collection }
/> 

export default function Collection({ CustomItem })
{
	
	const Item = DefaultItem || CustomItem
	const [ collections, setCollections ] = useState()

	useEffect( async () => {
			const fetchedCollections = await fetchCollections()
			setCollections( fetchedCollections )
		}, [] 
	)

	console.log( Item, collections )

	return <>
		<Navbar withLogin = { true }/>
		<Pane padding = {1} margin = {1}>
        {
					collections
						? collections.map( collection => {
							console.log( collection )
							return <DefaultItem collection = { collection }/> 
						}) 
						: <CenteredSpinner/>
      	}
		</Pane>
	</>

}
