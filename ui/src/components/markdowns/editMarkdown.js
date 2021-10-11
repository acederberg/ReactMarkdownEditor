// This the test box with buttons. To view the markdown, we will have to render it somewhere into the dom.
import { Pane, Label, Textarea as TextArea, TextInput } from 'evergreen-ui'
import { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import RenderMarkdown from './renderMarkdown.js'
import { delete_markdown, get_markdown, post_markdown, put_markdown } from './fetchMarkdown.js'

const Warning = ({ msg }) => <p className = 'Warning'>{ msg }</p> 

const Input = ( { id, label, onChange, ...props } ) => <>
	<Label htmlFor = { id } { ...props }>{ label }</Label>
	<br/>
	<TextInput
		id = { id }
		onChange = { onChange }
	/>
</>

const Inputs = {
	title : "Title",
	description : "Description",
	author : "Author"
}

class Editor extends Component{

	constructor( props ){
		super( props )
		this.state = { 
			content : {
				body : '',
				metadata : {
					title : '',
					description : '',
					author : ''
				}
			},
			internal_error : false
		}
		this.args = { collection : this.props.collection, _id : this.props._id }
	}
	getContent = () => get_markdown( 
			this.args,
			data => this.setState({ loading : false }) 
	) 
	deleteContent = () => delete_markdown( 
			this.args, 
			() => this.setState({ loading : true }) 
	)
	postContent = () => post_markdown( {	
			...this.state.content,
			collection : this.props 
	} )
	putContent = () => put_markdown( {
			content : this.state.content,
			filter : { _id : this.props.arg }
	} )
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
		console.log( this.state )
		return ( <>
		<h1>Markdown Editor</h1>
		{  
		!this.state.loading 
		? 
			<Pane>
				<Warning msg = "Document does not exist" ></Warning>
			</Pane>
		: 
			<>
			<Pane>
				<Pane>{
					Inputs.map( key => <Input 
						id = { key } 
						label = { Inputs[ key ] } 
						onClick = { ( event ) => this.onChange( event, key ) }
					/> )
				}</Pane>

				<Pane>
					<Label htmlFor = 'content'>Content</Label>
					<TextArea
						id = 'content'
						onChange = { (event) => this.onChange( event, 'content' ) } 
						placeholder = "# Example"
						value = { this.state.content }
						rows = "32"
					/>
					<ButtonToolbar>
						<Button 
							variant = "primary"
							onClick = { this.postContent }
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
export default function EditMarkdown( into, collection, _id ){
	ReactDOM.render( <Editor collection = { collection } _id = { _id }/> , into )
}
