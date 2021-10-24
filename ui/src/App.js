import Collections from './components/collection.js'
import View from './components/view.js'
import Edit, { history } from './components/edit.js'
console.log( history )

//import { Auth0Provider } from '@auth0/auth0-react'
import { Router, Route } from "react-router-dom"
/*	
<Auth0Provider
	domain = { process.env.REACT_APP_AUTH0_DOMAIN }
	clientId = { process.env.REACT_APP_AUTH0_CLIENT_ID }
	redirectUri = { process.env.REACT_APP_AUTH0_REDIRECT_URI }
>
</Auth0Provider>
*/
function App() {
	return <Router history = { history }>
			<Route
				path = '/collections'
				component = { Collections }
			/>
			<Route
				path = '/view/:collection/:_id'
				component = { View }
			>
			</Route>
			<Route
				path = '/edit/:collection/:_id'
				component = { Edit }
			>
			</Route>
		</Router>
}
export default App;
