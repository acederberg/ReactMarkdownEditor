import fetchCollections from "./fetchCollections"
import Samples from "./sample"
import SamplesWrapper from "./sample/samplesWrapper.js"

import { Pane, Spinner } from "evergreen-ui"
import { Component } from "react"

export default class Collection extends Component
{
        constructor( props ){
		super( props )
		this.state = { loading : false, data : undefined }
        }
        getContent = () => fetchCollections()
		.then( (data) => this.setState({ data : data }) )
	componentDidMount(){
		this.getContent()
	}
	render(){
		console.log( this.state )
		return <Pane padding = {16} margin = {32}>
			{
				this.state.data
				? 
				this.state.data.map( collection => <Samples collection = { collection } key = { collection }/>) 
				:
				<SamplesWrapper>
					<Spinner size = { 64 } padding = {16} margin = {32}/>
				</SamplesWrapper>
			}
		</Pane>
	}
}
