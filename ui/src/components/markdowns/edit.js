import EditMarkdown from './editMarkdown.js'

const Edit = ({match:{params:{ collection, _id }}}) => {
	let wrapper = document.getElementById( 'wrapper' )
	EditMarkdown( wrapper, collection, _id )
	return <div></div>
}

export default Edit ;
