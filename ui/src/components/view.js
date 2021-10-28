import ViewMarkdown from './markdowns/viewMarkdown.js'

// Take in parameters for ViewMarkdown from a route.
const View = ( { match: { params : { collection, _id } } } ) => <ViewMarkdown
	collection = { collection }
	_id = { _id }
/>

export default View
