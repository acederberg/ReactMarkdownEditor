import './Wrapper.css';
import Navbar from './Components/Navbar.js'

export default function Wrapper(props) { return ( 
	<>
	<Navbar/>
	<div className = "bg-light text-dark Wrapper" { ...props } ></div>
	</>
) }

