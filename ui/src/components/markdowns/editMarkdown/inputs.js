import { Pane, Label, Textarea as TextArea } from 'evergreen-ui'
import { useState } from 'react'
import Tags from './tags.js'
import IsActive from './isActive.js'
import { TextInputs, TextInput } from './textInput.js'

// Metadata.
// Updates a closure so that the buttons may work with this closure.
function BigTextInput({ editorClosure }){

	// Update closur
	const [ value, setValue ] = useState( editorClosure.getKey( 'body' ) )


	return <Pane>
		<Label 
			htmlFor = 'content'
			width = { 380 }
		>Content</Label>
		<br/>
		<Pane margin = { 24 }>
		<TextArea
			id = 'content'
			onChange = { ( event ) => editorClosure.set( 'body', event.target.value )}
			onClick = { () => console.log( editorClosure.getKey( 'body' ) ) }
			placeholder = "# Example"
			defaultValue = { value }
			columns = "16"
			rows = "32"
		/>
		</Pane>
	</Pane>

}


export default function Inputs({ editorClosure })
{
	console.log( 'Rendering inputs.' )
	const onChange = ( event, key ) => {
		editorClosure.set( key, event.target.value )
	}
	return <>
		{
			Object.keys( TextInputs ).map( key => <TextInput
				id = { key }
				label = { TextInputs[ key ] }
				onChange = { ( event ) => onChange( event, key ) }
				defaultValue = { editorClosure.getKey( key ) }
			/> )
		}
		<IsActive editorClosure = { editorClosure }/>
		<Tags editorClosure = { editorClosure }/>
		<BigTextInput editorClosure = { editorClosure }/>
	</>
}

