import './wrapper.css';
//import Navbar from './navbar.js'

export default function Wrapper(props) { 
	return <>
		<div id = 'wrapper' className = "text-dark Wrapper" { ...props } ></div>
	</>
}
