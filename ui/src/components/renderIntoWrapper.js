import ReactDom from 'react-dom'

export default function create_renders_into_wrapper ( Component ){
	function wrapper(){
		let wrapper =document.getElementById( 'wrapper' )
		ReactDom.render( <Component/>, wrapper )
		return <div></div>
	}
	return wrapper
}
