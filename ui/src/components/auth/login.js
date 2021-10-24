import { Button } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react"

const Login = ({ auth }) => {
	// Could just use HOC but I might want them to look different.
	console.log( auth )
	const { isAuthenticated, loginWithRedirect, logout } = auth
	console.log( isAuthenticated )
	return isAuthenticated ? <Button 
		onClick = { () => logout() }
	>Log Out</Button> : <Button 
		onClick = { () => loginWithRedirect() }
	>Log In</Button> 
}

export default Login ;
