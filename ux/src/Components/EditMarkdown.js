// This the test box with buttons. To view the markdown, we will have to render it somewhere into the dom.
import { Pane, Label, Textarea as TextArea } from 'evergreen-ui'
import { Component } from 'react'
import ReactDOM from 'react-dom'
import RenderMarkdown from './RenderMarkdown.js'

class Editor extends Component{

	// I like the closure design pattern
	constructor( props ){
		super( props )
		this.state = { content : '' }
	}
	onChange = ( event ) => { this.setState( { content : event.target.value } )
	}
	render(){ 
		return (<>
		<h1>Markdown Editor</h1>
		<Pane 
			onChange = { this.onChange }
		>
		<Label htmlFor = 'textarea'>Edit and Render Markdown in Real Time</Label>
		<TextArea
			id = 'textarea'
			description = 'Enter your markdown below.'
			placeholder = "# Example"
		>
		</TextArea>
		<div scroll-behaviour = 'smooth' >
			<RenderMarkdown raw_markdown = { this.state.content }/>	 
		</div>
		</Pane>
		</>
	) }
}

export default function EditMarkdown( into ){
	ReactDOM.render( <Editor/> , into )
}
