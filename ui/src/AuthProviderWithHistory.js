import { Router, Switch } from "react-router-dom"
import { createBrowserHistory } from "history"
import { Auth0Provider } from "@auth0/auth0-react"

export const history = createBrowserHistory()
const onRedirect = ( appState ) => {
        history.push( appState?.returnTo || window.location.pathname )
}

export default function AuthRouter({ children }){ 
	return <Auth0Provider
		domain = { process.env.REACT_APP_AUTH0_DOMAIN }
		clientId = { process.env.REACT_APP_AUTH0_CLIENT_ID }
		redirectUri = { `${window.location.origin}${window.location.pathname}` }
		audience = { process.env.REACT_APP_AUTH0_AUDIENCE }
	>
		<Router history = { history }>
			<Switch>
				{ children }
			</Switch>
		</Router>
	</Auth0Provider>
}
