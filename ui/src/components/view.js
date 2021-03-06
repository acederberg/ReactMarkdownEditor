import ViewMarkdown from './markdowns/viewMarkdown.js'
import Navbar from './navbar.js'

// Take in parameters for ViewMarkdown from a route.
const View = ( { match: { params : { collection, _id } } } ) => <>
		<Navbar withLogin = { false }/>
		<ViewMarkdown
			collection = { collection }
			_id = { _id }
		>
		</ViewMarkdown>
</>

export default View
