import fetchCollections from "./fetchCollections"
import Samples from "./sample"
import SamplesWrapper from "./sample/samplesWrapper.js"

import { Pane, Spinner } from "evergreen-ui"
import { useState, useEffect } from "react"
import Navbar from "../navbar.js"

export default function Collection( props ){
	const [ state, setState ] = useState({ loading : false, data : undefined })
        const getContent = () => fetchCollections().then( (data) => setState({ data : data }) )
	useEffect( () => getContent(), [] )

	return <>
		<Navbar withLogin = { true }/>
		<Pane padding = {1} margin = {1}>
                        {
                                state.data ?
                                state.data.map( collection => <Samples 
					collection = { collection } 
					key = { collection }
				/> ) : <SamplesWrapper>
                                        <Spinner size = { 64 } padding = {16} margin = {32}/>
                                </SamplesWrapper>
                        }
	</Pane></>
}
