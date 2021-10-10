import Collections from './components/collection'
import View from './components/markdowns/view.js'
import Edit from './components/markdowns/edit.js'

import { BrowserRouter, Route } from "react-router-dom"



function App() {
	return <BrowserRouter>
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

	
}

export default App;
