import { TagInput, Label, Pane } from 'evergreen-ui'
import { useState } from 'react'

export default function Tags({ editorClosure }){

	const [ values, setValues ] = useState( editorClosure.get().metadata.tags )
	const onChange = ( values ) => {
		setValues( values )
		editorClosure.set( 'tags', values )
		console.log( editorClosure.get() )
	}
	return <Pane>
		<Label 
			htmlFor = 'tags'
			width = { 256 }
		>Tags</Label>
		<br/>
		<Pane margin = { 24 }>
			<TagInput
				id = 'tags'
				inputProps = {{ placeholder : 'Add another tag' }}
				values = { values }
				onChange = { onChange }
			></TagInput>
		</Pane>
	</Pane>

}
