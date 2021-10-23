import Collections from './components/collection.js'
import View from './components/view.js'
import Edit from './components/edit.js'

import { BrowserRouter, Route } from "react-router-dom"

function App() {
	// NB: All elements must be rendered into the dom using a component returning a div.
	return <>
	<BrowserRouter>
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
	</BrowserRouter>
	</>
	
}
export default App;
