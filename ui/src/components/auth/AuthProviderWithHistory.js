import { Router, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import { Auth0Provider } from "@auth0/auth0-react"

export const history = createBrowserHistory()
/*
const onRedirect = ( appState ) => {
        history.push( appState?.returnTo || window.location.pathname )
}
*/

function TheRouter({ children }){
	return <Router history = { history }>
		<Switch>
			{ children }
		</Switch>
	</Router>
}
export default function AuthRouter({ children }){ 
	return /*( process.env.REACT_APP_TESTING === 'true' ) ?*/ <Auth0Provider
		domain = { process.env.REACT_APP_AUTH0_DOMAIN }
		clientId = { process.env.REACT_APP_AUTH0_CLIENT_ID }
		redirectUri = { `${window.location.origin}${window.location.pathname}` }
		audience = { process.env.REACT_APP_AUTH0_TOKEN_AUDIENCE }
	>
		<TheRouter children = { children }></TheRouter>
	</Auth0Provider> 
		//: <TheRouter children = { children }></TheRouter>
}
