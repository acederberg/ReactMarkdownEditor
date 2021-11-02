// Syntax highlighting is verbatim from the docks. https://github.com/remarkjs/react-markdown
import { WithMarkdown } from './editMarkdown'

export default function ViewMarkdown({ collection, _id }){
	const Etc = ( editorClosure, collection, _id ) => <div></div>
	return <WithMarkdown _id = { _id } collection = { collection } Etc = { Etc }/>
}
