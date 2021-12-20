import { Button, Dialog, Pane } from 'evergreen-ui'
import { DownloadIcon, FloppyDiskIcon, UndoIcon, TrashIcon  } from 'evergreen-ui'
import { ButtonToolbar } from 'react-bootstrap'
import { useState } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

import { post_markdown, put_markdown, delete_markdown } from '../fetchMarkdown.js'

function JsonButton({ editorClosure }){

	const [ overlay, setOverlay ] = useState( false )

	return <>
		<Dialog
			hasFooter = { false }
			isShown = { overlay }
			title = "JSON"
			onCloseComplete = { () => setOverlay( false ) }
		>
			<pre>
				{ JSON.stringify( editorClosure.get(), null, 2 ) }
			</pre>
		</Dialog>
		<Button
			margin = { 4 }
			appearence = "minimal"
			intent = "success"
			iconBefore = { DownloadIcon }
			onClick = {
				( ) => setOverlay( true )
			}
		>JSON</Button>
	</>

}

const InsufficientPrivilages = () => alert( "Insufficient privilages" )


// https://evergreen.segment.com/foundations/icons
export default function Buttons({ _id, collection, editorClosure, safe }){

	const { getAccessTokenSilently } = useAuth0()
	const save = !safe ? Save : InsufficientPrivilages
	
	async function Save()
	{

		const content = editorClosure.get()
		const token = getAccessTokenSilently()
		console.log( _id )
		if ( _id !== "undefined" ){
			put_markdown(
				{
					collection : collection,
					content : content,
					filter : { _id : _id },
					token : token
				}
			)
		}	
		else{
			post_markdown(
				{
					collection : collection, 
					content : content, 
					token : token 
				}
			)
		}	
	}

	const destroy = !safe ? ( 
		() => delete_markdown(
			{
				collection : collection, 
				_id : _id,
				token : getAccessTokenSilently()
			}
		)
	) : InsufficientPrivilages 


	return <Pane margin = { 24 }>
		<ButtonToolbar>

			<Button
				margin = { 4 }
				appearance = "primary"
				intent = "primary"
				iconBefore = { FloppyDiskIcon } 
				onClick = { save }
			>Save</Button>

			<JsonButton editorClosure = { editorClosure }/>

			<Button
				margin = { 4 }
				appearance = "primary"
				intent = "danger"
				iconBefore = { UndoIcon }
				onClick = { () => window.location.reload() }
			>Revert</Button>

			<Button
				margin = { 4 }
				appearance = "primary"
				intent = "danger"
				iconBefore = { TrashIcon }
				onClick = { destroy }
			>Delete</Button>

		</ButtonToolbar>
	</Pane>
}

