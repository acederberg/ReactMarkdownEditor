import { Component } from "react"
import { Pane, Heading } from "evergreen-ui"
import fetchSamples from "./fetchSamples.js"
import Sample from "./sample.js"

/*
export default ({ collection, ...props }) => {
	const children = await fetchSamples( collection )
}
*/

export default class sample extends Component{
	
	constructor( props ){
		// props = { collection, document }
		super( props )
		this.state = { 
			loaded : false,
			data : undefined
		}
	}
	getContent = async () => fetchSamples( this.props.collection ).then( ( data ) => this.setState({ loaded : true, data : data }) )
	componentDidMount(){ 
		console.log( 'componentDidMount' )
		this.getContent() 
	}
	render(){
		console.log( 'rendering' )
		console.log( this.state )
		return <Pane margin = { 64 } padding = { 32 } elevation = { 2 } background = 'gray50'>
			<Heading size = { 1200 } padding = { 32 }>{ `Latest articals in ${ this.props.collection }` }</Heading>
			<Pane padding = { 32 }>
			{ 
				this.state.loaded && this.state.data
				?
				Object.keys( this.state.data ).map( _id => <Sample { ...this.state.data[_id] }/> ) 
				:
				'Loading'
			}
			</Pane>
		</Pane> 
	}
}
