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
	
	const Item = CustomItem || DefaultItem
	const [ collections, setCollections ] = useState()

	useEffect( async () => {
			const fetchedCollections = await fetchCollections()
			console.log( fetchedCollections ) 
			setCollections( fetchedCollections )
		}, [] 
	)

	return <>
		<Navbar withLogin = { true }/>
		<Pane padding = {1} margin = {1}>
        {
					collections
						? collections.map( collection => {
							return <Item collection = { collection }/> 
						}) 
						: <CenteredSpinner/>
      	}
		</Pane>
	</>

}
