import { BrowserRouter, Route } from 'react-router-dom'

import View from './Components/View.js'
import Edit from './Components/Edit.js'
import Wrapper from './Components/Wrapper.js';

const App = () => 
	<BrowserRouter>
		<Route
			path = '/view/:filename'
			component = { View }
		>
		</Route>
		<Route
			path = '/edit/'
			component = { Edit }
		>
		</Route>
	</BrowserRouter>
	
export default App;
