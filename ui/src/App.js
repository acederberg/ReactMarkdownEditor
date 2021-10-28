import Collections from './components/collection.js'
import View from './components/view.js'
import Edit from './components/edit.js'

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
				path = '/view/'
				component = { View }
			>
			</Route>
			<ProtectedRoute
				path = '/edit/'
				component = { Edit }
			>
			</ProtectedRoute>
		</ViewerContextProvider>
	</AuthProviderWithHistory>
}
export default App;
