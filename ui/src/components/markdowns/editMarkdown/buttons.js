import { Button, Dialog, Pane, Popover} from 'evergreen-ui'
import { DownloadIcon, FloppyDiskIcon, UndoIcon, TrashIcon  } from 'evergreen-ui'
import { ButtonToolbar, ButtonGroup } from 'react-bootstrap'
import { useState } from 'react'
import { put_markdown, delete_markdown, get_markdown } from '../fetchMarkdown.js'

function JsonButton({ editorClosure }){
	const [ overlay, setOverlay ] = useState( false )
	return <>
		<Dialog
			hasFooter = { false }
			isShown = { overlay }
			title = "JSON"
			onCloseComplete = { () => setOverlay( false ) }
		><pre>{ JSON.stringify( editorClosure.get(), null, 2 ) }</pre></Dialog>
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
// https://evergreen.segment.com/foundations/icons
export default function Buttons({ _id, collection, editorClosure }){

        return <Pane margin = { 24 }>
                <ButtonToolbar>
                        <Button
                                margin = { 4 }
                                appearance = "primary"
                                intent = "primary"
				iconBefore = { FloppyDiskIcon } 
                                onClick = {
                                        () => put_markdown({
						collection : collection,
                                                content : editorClosure.get() ,
                                                filter : { _id : _id },
                                                collection : collection
                                        }) //&& </Toaster>
                                }
                        >Save</Button>
			<JsonButton editorClosure = { editorClosure }/>
			<Button
				margin = { 4 }
				appearance = "primary"
				intent = "danger"
				iconBefore = { UndoIcon }
				onClick = {
					() => window.location.reload()
				}
			>Revert</Button>
			<Button
				margin = { 4 }
				appearance = "primary"
				intent = "danger"
				iconBefore = { TrashIcon }
				onClick = {
					() => delete_markdown({ collection : collection, _id : _id })
				}
			>Delete</Button>
		</ButtonToolbar>
        </Pane>
}

