import { Component, useState, useEffect } from "react"
import { Pane, Heading } from "evergreen-ui"
import SamplesWrapper from "./samplesWrapper.js"
import fetchSamples from "./fetchSamples.js"
import Sample from "./sample.js"
import CenteredSpinner from '../../centeredSpinner.js'

export default function Samples({ collection, _id })
{
	
	let fetched = false
	const [ data, setData ] = useState()
	
	useEffect( async () => {
		const fetchedData = await fetchSamples( collection )
		fetched = true
		setData( fetchedData )
	}, [])

	return <SamplesWrapper>
		{
		data
			? <>
				<Heading 
					size = { 1200 } 
					padding = { 32 }
				>
					{ `Latest articals in ${ collection }` }
				</Heading>
				<Pane 
					padding = { 32 } 
					style = {{ alignItems : 'inital', display : 'inline-flex', flexFlow : 'wrap' }}
				>
					{
						Object.keys( data )
							.map( 
								_id => {
									console.log( _id, data[ _id ] )
									return <Sample 
										collection = { collection } 
										{ ...data[ _id ] } 
									/>
								}
							)
					}
				</Pane>
			</>
			: (
				fetched 
					? <CenteredSpinner/>
					: <div/>
			)
		}
	</SamplesWrapper>

}


