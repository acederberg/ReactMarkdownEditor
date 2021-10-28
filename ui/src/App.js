import Collections from './components/collection.js'
import View from './components/view.js'
import Edit from './components/edit.js'
import Navbar from './components/navbar.js'

import { Route } from "react-router-dom"
import AuthProviderWithHistory from "./AuthProviderWithHistory.js"
import { ViewerContextProvider } from "./components/viewerContext.js"
import ProtectedRoute from "./protectedRoute.js"

function App() {
	return <AuthProviderWithHistory>
		<ViewerContextProvider>
			<Route
				path = '/collections'
				component = { Collections }
			/>
			<Route
				// Need uri parameters for easy sharing.
				// Since collection and id are in localStorage.
				path = '/view/:collection/:_id'
				component = { View }
			>
			</Route>
			<ProtectedRoute
				// Just uses localStorage.
				// Must be constant for whitelogging.
				// The logic of what happens when a sample is clicked will change for users vs admin users.
				path = '/edit'
				component = { Edit }
			>
			</ProtectedRoute>
		</ViewerContextProvider>
	</AuthProviderWithHistory>
}
export default App;
