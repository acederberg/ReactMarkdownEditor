import EditMarkdown from './markdowns/editMarkdown.js'

// Uses the pattern as the markdown render, e.g. render in to wrapper or elsewhere using the function in the next directory up.
const Edit = ({match:{params:{ collection, _id }}}) => {
	let wrapper = document.getElementById( 'wrapper' )
	EditMarkdown( wrapper, collection, _id )
	return <div></div>
}

export default Edit ;
