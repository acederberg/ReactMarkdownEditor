import { Pane, Label, Textarea as TextArea } from 'evergreen-ui'
import { useState } from 'react'
import Tags from './tags.js'
import IsActive from './isActive.js'
import { TextInputs, TextInput } from './textInput.js'

// Metadata.
// Updates a closure so that the buttons may work with this closure.

export default function Inputs({ editorClosure })
{
	const [ state, setState ] = useState( editorClosure.get() ) ;
	const onChange = ( event, key ) => {
		// Update state.
		// Might not be worth it.
		/*
		setState( ( state, prevState ) => {
			state[ key ] = event.target.value
			return state
		} )
		*/

		// Update closure
		console.log( key, event.target.value )
		editorClosure.set( key, event.target.value )
	}
	console.log( editorClosure.get() )
	console.log( state.metadata )
	return <>
		{
			Object.keys( TextInputs ).map( key => console.log( state.metadata [ key ] ) || <TextInput
				id = { key }
				label = { TextInputs[ key ] }
				onChange = { ( event ) => onChange( event, key ) }
				defaultValue = { state.metadata[ key ] }
			/> )
		}
		<IsActive editorClosure = { editorClosure }/>
		<Tags editorClosure = { editorClosure }/>
		<Pane>
			<Label 
				htmlFor = 'content'
				width = { 380 }
			>Content</Label>
			<br/>
			<Pane margin = { 24 }>
			<TextArea
				id = 'content'
				onChange = { ( event ) => onChange( event, 'body' ) }
				placeholder = "# Example"
				value = { state.body }
				columns = "16"
				rows = "32"
			/>
			</Pane>
		</Pane>
	</>
		/*
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
			</ButtonToolbar>*/
}

