import { AuthProviderWithHistory, Collections, TryEdit, Edit, Home, New, Projects, ProtectedRoute, View, ViewerContextProvider } from './components'
import { Route, Redirect } from "react-router-dom"


export default function App() {

	return <AuthProviderWithHistory>
		<ViewerContextProvider>
			<ProtectedRoute
				path = '/new'
				component = { New }
			/>	
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
			<Route 
				path = '/projects'
				component = { Projects }
			/>
			<Route 
				path = '/home'
				component = { Home }
			/>
			<ProtectedRoute
				// Just uses localStorage.
				// Must be constant for whitelogging.
				// The logic of what happens when a sample is clicked will change for users vs admin users.
				path = '/edit'
				component = { Edit }
			/>
			<Route
				path = '/tryEdit'
				component = { TryEdit }
			/>
			<Route
				exact path = '/'
				component = { () => <Redirect to = '/home'/> }
			/>
		</ViewerContextProvider>
	</AuthProviderWithHistory>
}
