import { AuthProviderWithHistory, Collections, Edit, View, Navbar, ProtectedRoute, ViewerContext, ViewerContextProvider } from './components'
import { Route } from "react-router-dom"

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
			<Route
				// Just uses localStorage.
				// Must be constant for whitelogging.
				// The logic of what happens when a sample is clicked will change for users vs admin users.
				path = '/edit'
				component = { Edit }
			>
			</Route>
		</ViewerContextProvider>
	</AuthProviderWithHistory>
}
export default App;
