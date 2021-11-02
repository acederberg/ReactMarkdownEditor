import { AuthProviderWithHistory, Collections, Edit, View, ProtectedRoute, ViewerContextProvider } from './components'
import { Route } from "react-router-dom"

export default function App() {
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
			/>
			<ProtectedRoute
				// Just uses localStorage.
				// Must be constant for whitelogging.
				// The logic of what happens when a sample is clicked will change for users vs admin users.
				path = '/edit'
				component = { Edit }
			/>
		</ViewerContextProvider>
	</AuthProviderWithHistory>
}
/*		<Route 
			path = '/projects'
			component = { () => <><h1>Projects</h1><p>Currently adding projects. Website is under development.</p></> }
		/>
		<Route 
			path = '/home'
			component = { () => <><h1>Home</h1><p>This is a placeholder</p></> }
		/>
*/

