import fetchCollections from "./fetchCollections"
import Samples from "./sample"

import { Pane } from "evergreen-ui"
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
		console.log( 'rendering' )
		return <Pane>
			{
				this.state.data
				? 
				this.state.data.map( collection => <Samples collection = { collection } />) 
				:
				"No collections found"
			}
		</Pane>
	}
}
