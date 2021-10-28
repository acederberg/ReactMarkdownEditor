import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

import './index.css';
import App from './App';
import Wrapper from './components/wrapper.js'

async function main(){
        const root = await document.getElementById( 'root' )
        await ReactDOM.render(
		<>
			<Wrapper id = "wrapper"/>
			<div id = "appWrapper"/>
		</>,
		root
        )
	const appWrapper = await document.getElementById( "appWrapper" )
        ReactDOM.render( <App/>, appWrapper )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
main()
reportWebVitals();
