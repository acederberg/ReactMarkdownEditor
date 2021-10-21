import { Auth0Provider } from '@auth0/auth0-react'
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';


import './index.css';
import App from './App';
import Wrapper from './components/wrapper.js'

async function main(){
		console.log ( process.env )
        await ReactDOM.render(
		<Auth0Provider
			domain = { process.env.REACT_APP_AUTH0_DOMAIN }
			clientId = { process.env.REACT_APP_AUTH0_CLIENT_ID }
			redirectUri = { process.env.REACT_APP_AUTH0_REDIRECT_URI }
		>
			<Wrapper id = "wrapper"/>
		</Auth0Provider>,
                document.getElementById( 'root' )
        )
        const wrapper = document.getElementById( 'wrapper' )
        console.log( wrapper )
        ReactDOM.render( <App/>,  wrapper )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
main()
reportWebVitals();
