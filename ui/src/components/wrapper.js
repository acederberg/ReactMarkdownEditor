import './wrapper.css';
import Navbar from './navbar.js'
import { useAuth0 } from '@auth0/auth0-react'

export default function Wrapper(props) { 
	return <><Navbar/><div id = 'wrapper' className = "text-dark Wrapper" { ...props } ></div></>
}
