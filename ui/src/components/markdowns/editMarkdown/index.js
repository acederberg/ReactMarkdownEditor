import Inputs from './inputs.js'
import Buttons from './buttons.js'
import createEditorClosure from './closure.js'
import { get_markdown } from '../fetchMarkdown.js'

const fetchClosure = ({ id, collection }) => {
	const data = get_markdown({ id, collection })
	console.log( data )

	return createEditorClosure({ 
		body : data.body,
		metadata : {
			description : data.description,
			title : data.title,
			tags : data.tags,
			repo : data.repo
		}
	})
}


export default function EditMarkdown({ id, collection }){

	const editorClosure = fetchClosure({ id : id, collection : collection })
//		<View editorClosure = { editorClosure }/>
	return <>
		<Inputs editorClosure = { editorClosure }/>
		<Buttons editorClosure = { editorClosure }/>
	</>


}
