import { Component } from "react"
import { Pane, Heading } from "evergreen-ui"
import SamplesWrapper from "./samplesWrapper.js"
import fetchSamples from "./fetchSamples.js"
import Sample from "./sample.js"

export default class sample extends Component{
	
	constructor( props ){
		// props = { collection, document }
		super( props )
		this.state = { 
			loaded : false,
			data : undefined
		}
	}
	getContent = async () => fetchSamples( this.props.collection )
		.then( ( data ) => this.setState({ loaded : true, data : data }) )
	componentDidMount(){ 
		this.getContent() 
	}
	render(){
		console.log( this.props.collection )
		console.log( this.state )
		// console.log( this.state.data ? "Good" : "Bad" )
		return this.state.data ?
		<SamplesWrapper>
			<Heading size = { 1200 } padding = { 32 }>{ `Latest articals in ${ this.props.collection }` }</Heading>
			<Pane padding = { 32 } style = {{ alignItems : 'inital', display : 'inline-flex', flexFlow : 'wrap' }}>
			{ 
				this.state.loaded
				?
				Object.keys( this.state.data ).map( _id => {
					let props = this.state.data[ _id ]
					props[ '_id' ] = _id
					return <Sample collection = { this.props.collection } { ...props }/> 
				} ) 
				:
				'Loading'
			}
			</Pane>
		</SamplesWrapper> 
		:
		<div></div>
	}
}
