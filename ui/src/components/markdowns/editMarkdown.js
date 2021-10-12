// This the test box with buttons. To view the markdown, we will have to render it somewhere into the dom.
import { Pane, Label, Textarea as TextArea, TextInput, Spinner } from 'evergreen-ui'
import { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import ReactDOM from 'react-dom'
import RenderMarkdown from './renderMarkdown.js'
import { clean, delete_markdown, get_markdown, post_markdown, put_markdown } from './fetchMarkdown.js'

const Warning = ({ msg }) => <p className = 'Warning'>{ msg }</p> 

const Input = ( { id, label, onChange, ...props } ) => <>
	<Label htmlFor = { id } { ...props } width = { 256 } >{ label }</Label>
	<Pane style = {{ display : 'flex' }}>
		<TextInput
			id = { id }
			onChange = { onChange }
			width = { 512 }
			{ ...props }
		/>
	</Pane>
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
			internal_error : false,
			loaded : false,
			exists : false
		}
		this.args = { collection : this.props.collection, _id : this.props._id }
	}
	getContent = () => get_markdown( 
			this.args,
			data => {
				this.setState( { loading : false, content : clean( data ), exists : !!Object.keys( data ) } )
			}
	) 
	deleteContent = () => delete_markdown( 
			this.args, 
			() => this.setState({ loading : true }) 
	)
	postContent = () => post_markdown( {	
			collection : this.props.collection,
			...this.state.content
	} )  
	putContent = () => put_markdown( {
			collection : this.props.collection,
			content : this.state.content,
			filter : { _id : this.props._id }
	} )
	componentDidMount(){ 
		this.getContent()
	}
	onChange = ( event, key ) => {
		const data = event.target.value
		this.setState( state => state.content.metadata[ key ] = data )
	}
	render(){ 
		// Recall that the save button will use `post_markdown` which uses the arguement `override` determining if it should `PUT` or `POST`.
		console.log( this.state )
		return ( <>
		<h1>Markdown Editor</h1>
		{  
		this.state.loading 
		? 
			<Pane>
				<Spinner/>
			</Pane>
		: 
			<>
			<Pane>
				<Pane>{
					Object.keys( Inputs ).map( key => <Input 
						id = { key } 
						label = { Inputs[ key ] } 
						onClick = { ( event ) => this.onChange( event, key ) }
						defaultValue = { this.state.content.metadata[ key ] }
					/> )
				}</Pane>
				<Pane>
					<Label htmlFor = 'content'>Content</Label>
					<TextArea
						id = 'content'
						onChange = { ( event ) => this.setState( state => state.content.body = event.target.value ) } 
						placeholder = "# Example"
						value = { this.state.content.body }
						rows = "32"
					/>
					<ButtonToolbar>
						<Button 
							variant = "primary"
							onClick = { !this.state.exists ? this.postContent : this.putContent }
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
				</Pane>
			</Pane>
			<Pane>
				<Label htmlFor = 'rendered' >Preview</Label>
				<div className = 'Scrollable' id = 'rendered'>
					<RenderMarkdown raw_markdown = { this.state.content.body }/>	 
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
