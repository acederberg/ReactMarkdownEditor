import { BrowserRouter, Route } from 'react-router-dom'

import View from './Components/View.js'
import Wrapper from './Components/Wrapper.js';

const App = () => 
	<BrowserRouter>
		<Route
			path = '/:filename'
			component = { View }
		>
		</Route>
	</BrowserRouter>
	
export default App;
