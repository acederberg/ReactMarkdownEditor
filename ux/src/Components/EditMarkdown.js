// This the test box with buttons. To view the markdown, we will have to render it somewhere into the dom.
import { Pane, Label, Textarea as TextArea, TextInput } from 'evergreen-ui'
import { Component } from 'react'
import { Button } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import RenderMarkdown from './RenderMarkdown.js'
import { get_markdown, get_markdowns, post_markdown } from './fetchMarkdown.js'

class Editor extends Component{

	// I like the closure design pattern
	constructor( props ){
		super( props )
		this.state = { content : '', exists : false, filename : this.props.filename }
		console.log( `filename = ${ this.props.filename }` )
	}
	getContent = async () => {
		const markdown = await get_markdowns( data => data.find( artical => artical.filename === this.props.filename ) )
		console.log( markdown )
		this.setState({ exists : !!markdown })
		markdown && this.props.filename && get_markdown( 
			this.props.filename, 
			content => this.setState({ content : content }) 
		) 
	}
	componentDidMount(){ 
		this.getContent()
	}
	// onSave = 
	onChange = ( event, key ) => { 
		var data = {}
		data[ key ] = event.target.value
		this.setState( data )
	}
	render(){ 
		return (<>
		<h1>Markdown Editor</h1>

		{  this.exists ? null : (
		<Pane>
			<Label htmlFor = 'filename'>Filename</Label>
			<br/>
			<TextInput
				id = 'filename'
				onChange = { ( event ) => this.onChange( event, 'filename' ) }
				value = { this.state.exists ? this.state.filename : undefined }
			/>
		</Pane>  
		) }

		<Pane>
			<Label htmlFor = 'content'>Content</Label>
			<TextArea
				id = 'content'
				onChange = { (event) => this.onChange( event, 'content' ) }
				placeholder = "# Example"
				value = { this.state.exists ? this.state.content : undefined }
				rows = "48"
			>
			</TextArea>
			<div>
				<Button 
					varient = "primary"
					onClick = { () => post_markdown( 
						{ content : this.state.content, filename : this.props.filename },
						null,
						!this.state.exists
					) }
				>Save</Button>
				<Button 
					varient = "warning"
					onClick = { this.getContent }
				>Revert</Button>
			</div>
		</Pane>

		<Pane>
			<div scroll-behaviour = 'smooth' >
				<RenderMarkdown raw_markdown = { this.state.content }/>	 
			</div>
		</Pane>
		</>
	) }
}

export default function EditMarkdown( into, filename ){
	console.log( `filename = ${filename}` )
	ReactDOM.render( <Editor filename = { filename }/> , into )
}
