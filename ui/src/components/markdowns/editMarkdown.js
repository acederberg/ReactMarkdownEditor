// This the test box with buttons. To view the markdown, we will have to render it somewhere into the dom.
import { Pane, Label, Textarea as TextArea, TextInput } from 'evergreen-ui'
import { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import RenderMarkdown from './renderMarkdown.js'
import { delete_markdown, get_markdown, get_markdowns, post_markdown } from './fetchMarkdown.js'

const Warning = ({ msg }) => <p className = 'Warning'>{ msg }</p> 

class Editor extends Component{

	// I like the closure design pattern
	constructor( props ){
		super( props )
		this.state = { 
			content : '', 
 			exists : false, 
			internal_error : false
		}
		this.args = { collection : this.props.collection, _id : this.props._id }
	}
	getContent = () => get_markdown( 
			this.args,
			data => this.setState({ content : data.body, exists : true }) 
	) 
	deleteContent = () => delete_markdown( 
			this.args, 
			() => this.setState({ exists : false }) 
	)
	componentDidMount(){ 
		this.getContent()
	}
	onChange = ( event, key ) => { 
		var data = {}
		data[ key ] = event.target.value
		this.setState( data )
		console.log("state = ", this.state) 
	}
	render(){ 
		// Recall that the save button will use `post_markdown` which uses the arguement `override` determining if it should `PUT` or `POST`.
		// console.log( this.state )
		return ( <>
		<h1>Markdown Editor</h1>
		{  
		!this.state.exists 
		? 
			<Pane>
				<Warning msg = "Document does not exist" ></Warning>
			</Pane>
		: 
			<>
			<Pane>
				<Label htmlFor = 'filename'>Filename</Label>
				<br/>
				<TextInput
					id = 'filename'
					onChange = { ( event ) => {
						this.setState({ filename_changed : true } ) ;
						this.onChange( event, 'filename' ) ;
					} }
					value = { this.state.exists ? this.state.filename : undefined }
				/>
				<Pane>
					<Label htmlFor = 'content'>Content</Label>
					<TextArea
						id = 'content'
						onChange = { (event) => this.onChange( event, 'content' ) } 
						placeholder = "# Example"
						value = { this.state.exists ? this.state.content : undefined }
						rows = "32"
					/>
				</Pane>
			</Pane>  
			
			<Pane>
				<Label for = 'rendered' >Preview</Label>
				<div className = 'Scrollable' id = 'rendered'>
					<RenderMarkdown raw_markdown = { this.state.content }/>	 
				</div>
			</Pane>
			</>
		}
		</>
		) }
	}
/*
				<ButtonToolbar>
					<Button 
						variant = "primary"
						onClick = { this.postContent
						}
					>Save</Button>
					<Button 
					variant = "primary"
					onClick = { this.getContent }
				>Revert</Button>
				<Button
					style = {{float : 'left'}}
					variant = "danger"
					onClick = { this.deleteContent }
				>Delete</Button>
				</ButtonToolbar>
				{ this.state.bad_filename ? <Warning>InternalError</Warning> : undefined }
*/

export default function EditMarkdown( into, collection, _id ){
	ReactDOM.render( <Editor collection = { collection } _id = { _id }/> , into )
}
