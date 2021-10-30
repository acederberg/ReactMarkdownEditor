import { Button, Pane, TrashIcon } from 'evergreen-ui'
import { ButtonToolbar } from 'react-bootstrap'
import { put_markdown, delete_markdown, get_markdown } from '../fetchMarkdown.js'


export default function Buttons({ revert, _id, collection, editorClosure }){

        return <Pane margin = { 24 }>
                <ButtonToolbar>
                        <Button
                                margin = { 4 }
                                appearance = "primary"
                                intent = "primary"
                                onClick = {
                                        () => put_markdown({
                                                content : editorClosure.get() ,
                                                filter : { _id : _id },
                                                collection : collection
                                        }) //&& </Toaster>
                                }
                        >Save</Button>
                        <Button
                                margin = { 4 }
                                appearance = "primary"
                                intent = "danger"
                                iconBefore = { TrashIcon }
                                onClick = {
                                        () => revert()
                                }
                        >Revert</Button>
                        <Button
                                margin = { 4 }
                                appearance = "primary"
                                style = {{float : 'left'}}
                                intent = "danger"
                                iconBefore = { TrashIcon }
                                onClick = {
                                        () => delete_markdown({ collection : collection, _id : _id })
                                }
                        >Delete</Button>
                </ButtonToolbar>
        </Pane>
}
