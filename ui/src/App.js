import { /*ProtectedRoute, AuthProviderWithHistory, ViewerContextProvider, Collections, View,*/ Edit/*, Navbar, ViewerContext */} from './components'

import { Route } from "react-router-dom"


function App() {
	return <Edit/>
	/*<AuthProviderWithHistory>
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
	</AuthProviderWithHistory>*/
}
export default App;
