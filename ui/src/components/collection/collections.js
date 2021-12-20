import fetchCollections from "./fetchCollections"
import Samples from "./sample"
import SamplesWrapper from "./sample/samplesWrapper.js"
import Navbar from "../navbar.js"
import CenteredSpinner from "../centeredSpinner.js"

import { Pane } from "evergreen-ui"
import { useState, useEffect } from "react"


export default function Collection( props )
{
	
	const [ state, setState ] = useState({ loading : false, data : undefined })
  const getContent = () => fetchCollections().then( (data) => setState({ data : data }) )

	useEffect( () => getContent(), [] )

	return <>
		<Navbar withLogin = { true }/>
		<Pane padding = {1} margin = {1}>
        {
					state.data ?
					state.data.map( 
						collection => <Samples 
							collection = { collection } 
							key = { collection }
						/> 
					) : <CenteredSpinner/>
      	}
		</Pane>
	</>

}
