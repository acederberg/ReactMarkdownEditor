import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './Wrapper';
import reportWebVitals from './reportWebVitals';
import RenderMarkdown from './MarkdownUtils/RenderMarkdown.js'
import { BrowserRouter, Route } from 'react-router-dom'

ReactDOM.render( 
	<Wrapper id = 'wrapper' />, 
	document.getElementById('root')
)
/*
	<BrowserRouter>
		<Route 
			path = '/test3.md'
			render = { 
				() => {
					let wrapper = document.getElementById( 'wrapper' )
					console.log( `wrapper = ${wrapper}` )
					RenderMarkdown( 'test3.md', wrapper ) 
					return <div></div>
				}
			}
		</Route>
	</BrowserRouter>  ,
*/

const application = ({match:{params:{filename}}}) => {

	let wrapper = document.getElementById( 'wrapper' )
	console.log( filename )
	console.log( `wrapper = ${wrapper}` )
	RenderMarkdown( filename, wrapper ) 
	return <div></div>

}

ReactDOM.render(
	(<BrowserRouter>
		<Route 
			path = '/:filename'
			component = { application }
		>
		</Route>
	</BrowserRouter>)  ,
	document.getElementById( 'wrapper' )
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
