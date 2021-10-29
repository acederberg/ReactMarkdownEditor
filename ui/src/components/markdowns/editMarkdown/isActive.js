import { Label, Checkbox, Pane } from 'evergreen-ui'
import { useState } from 'react'

export default function IsActive({ editorClosure }){

	const initChecked = editorClosure.get().metadata.active
	const [ checked, setChecked ] = useState(initChecked)
	const onChange = ( event ) => {
		console.log( event.target.checked )
		setChecked( event.target.checked )
		editorClosure.set( 'active', event.target.checked )
	}
	return <Pane>
		<Label
			htmlFor = 'isActive'
		>
			Active
		</Label>
		<Pane id = 'isActive' margin = { 24 }>
			<Checkbox
				checked = { checked }
				onChange = { onChange }
			/>
		</Pane>
	</Pane>

}
