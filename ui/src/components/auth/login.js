import { Button } from "evergreen-ui"
import { useAuth0 } from "@auth0/auth0-react"

const Login = () => {
	// Could just use HOC but I might want them to look different.
	const { isAuthenticated, loginWithRedirect, logout } = useAuth0()
	return isAuthenticated ? <Button 
		appearance = "primary"
		intent = "warning"
		onClick = { () => logout() }
	>Log Out</Button> : <Button 
		appearance = "primary"
		onClick = { () => loginWithRedirect() }
	>Log In</Button> 
}

export default Login ;
