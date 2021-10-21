import './wrapper.css';
import MyNavbar from './Navbar.js'

export default function Wrapper(props) { return ( <>
	<MyNavbar/>
	<div id = 'wrapper' className = "text-dark Wrapper" { ...props } ></div>
	</>
) }
