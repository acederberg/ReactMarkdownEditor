import EditMarkdown from './EditMarkdown.js'

const Edit = ({match:{params:{filename}}}) => {
	console.log( `filename = ${filename}` )
	let wrapper = document.getElementById( 'wrapper' )
	EditMarkdown( wrapper, filename )
	return <div></div>
}

export default Edit ;
