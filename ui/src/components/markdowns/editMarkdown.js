// This the test box with buttons. To view the markdown, we will have to render it somewhere into the dom.
import { Pane, Label, Textarea as TextArea, TextInput, Spinner } from 'evergreen-ui'
import { Component } from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'
import { withAuth0 } from '@auth0/auth0-react'

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
	// It is important to recall that the functions from fetch will use destructuring in the first prop
	getContent = () => get_markdown( 
			this.args,
			data => {
				this.setState( { loading : false, content : clean( data ), exists : !!Object.keys( data ) } )
			}
	) 
	deleteContent = () => delete_markdown( 
			this.args 
	)
	postContent = () => post_markdown( {	
			collection : this.props.collection,
			content : this.state.content
	} )  
	putContent = () => {
		const args = {
			collection : this.props.collection,
			content : this.state.content,
			filter : { _id : this.props._id }
		} 
		console.log( args )
		put_markdown( args )
	}
	componentDidMount(){ 
		this.getContent()
	}
	onChange = ( event, key ) => this.setState( function( last_state ){
		last_state.content.metadata[ key ] = event.target.value
		return last_state
	} )
	render(){ 
		// Recall that the save button will use `post_markdown` which uses the arguement `override` determining if it should `PUT` or `POST`.
		return this.props.auth0.isAuthenticated ? ( <>
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
							onChange = { ( event ) => this.onChange( event, key ) }
							defaultValue = { this.state.content.metadata[ key ] }
						/> )
					}</Pane>
					<Pane>
						<Label htmlFor = 'content'>Content</Label>
						<TextArea
							id = 'content'
							onChange = { ( event ) => this.setState( 
								function( last_state, props ){
									last_state.content.body = event.target.value
									console.log( last_state )
									return last_state
								} 
							) } 
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
								hrefd = '/collections/'
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
			) : <> 
				<div className = "Warning">You must be signed in to edit this.  </div>
				<Button onClick = { this.props.auth0.loginWithRedirect }>Log in</Button>
			</>
	}
}

export default withAuth0( Editor )
