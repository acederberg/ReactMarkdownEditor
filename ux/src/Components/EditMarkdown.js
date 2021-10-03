// This the test box with buttons. To view the markdown, we will have to render it somewhere into the dom.
import { Pane, Label, Textarea as TextArea, TextInput } from 'evergreen-ui'
import { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import RenderMarkdown from './RenderMarkdown.js'
import { delete_markdown, get_markdown, get_markdowns, post_markdown } from './fetchMarkdown.js'

const in_filenames = ( name ) => get_markdowns( data => data.find( artical => artical.filename === name ) )
const Warning = ({ msg }) => <p className = 'Warning'>{ msg }</p> 

class Editor extends Component{

	// I like the closure design pattern
	constructor( props ){
		super( props )
		this.state = { 
			content : '', 
 			exists : false, 
			filename : this.props.filename ,
			current_filename : this.props.filename,
			filename_changed : false,
			internal_error : false
		}
		console.log( `filename = ${ this.props.filename }` )
	}
	getContent = async () => {
		const markdown = await in_filenames( this.props.filename )
		console.log( markdown )
		this.setState({ exists : !!markdown })
		markdown && this.props.filename && get_markdown( 
			this.props.filename, 
			content => this.setState({ content : content }) 
		) 
	}
	deleteContent = async () => {
		this.state.current_filename && delete_markdown( { target : this.state.current_filename } ) 
		this.setState({ exists : false })
	}
	postContent = async () => {
		if ( this.state.exists ) { await post_markdown( 
			{ content : this.state.content, filename : this.state.current_filename },
			null,
			!this.state.exists
		).catch( () => this.setState({ internal_error : true }) ) }
		if ( !this.state.filename_changed ){ return ; }
		if ( in_filenames( this.state.filename ) ){ 
			this.setState({ bad_filename : true })
			return ;
		}
		await post_markdown(
			{ source : this.state.current_filename, target : this.state.filename },
			null,
			false
		).then( () => this.setState({ current_filename : this.state.filename, exists : true }) )
	}
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
				{ this.state.bad_filename ?  <Warning>Filename aleady in use</Warning> : null }
			</Pane>  
			
			<Pane>
				<Label htmlFor = 'content'>Content</Label>
				<TextArea
					id = 'content'
					onChange = { (event) => this.onChange( event, 'content' ) } 
					placeholder = "# Example"
					value = { this.state.exists ? this.state.content : undefined }
					rows = "32"
				/>
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

export default function EditMarkdown( into, filename ){
	console.log( `filename = ${filename}` )
	ReactDOM.render( <Editor filename = { filename }/> , into )
}
