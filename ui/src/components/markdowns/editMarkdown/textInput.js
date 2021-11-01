import { TextInput as Input, Pane, Label } from 'evergreen-ui'

// Metadata text inputs.
export const TextInputs = {
        title : "Title",
        description : "Description",
//        repo : "Repository"
}

//
export const TextInput = ( { id, label, onChange, ...etc } ) => <Pane 
	key = { id }
>
	<Label 
		htmlFor = { id } 
		width = { 256 } 
	>
		{ label }
	</Label>
	<br/>
	<Pane margin = { 24 }>
		<Input
			id = { id }
			onChange = { onChange }
			width = { 512 }
			{ ...etc }
		/>
	</Pane>
</Pane>
