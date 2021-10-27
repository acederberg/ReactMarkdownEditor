import Collections from './components/collection.js'
import View from './components/view.js'
import Edit, { history } from './components/edit.js'

import { Route } from "react-router-dom"
import AuthProviderWithHistory from "./AuthProviderWithHistory.js"
import ProtectedRoute from "./protectedRoute.js"

function App() {
	return <AuthProviderWithHistory>
		<Route
			path = '/collections'
			component = { Collections }
		/>
		<Route
			path = '/view/:collection/:_id'
			component = { View }
		>
		</Route>
		<ProtectedRoute
			path = '/edit/:collection/:_id'
			component = { Edit }
		>
		</ProtectedRoute>
	</AuthProviderWithHistory>
}
export default App;
