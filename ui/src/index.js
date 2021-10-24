import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
//import { Auth0Provider } from '@auth0/auth0-react'

import './index.css';
import App from './App';
import Wrapper from './components/wrapper.js'

/*<Auth0Provider
                domain = { process.env.REACT_APP_AUTH0_DOMAIN }
                clientId = { process.env.REACT_APP_AUTH0_CLIENT_ID }
                redirectUri = { process.env.REACT_APP_AUTH0_REDIRECT_URI }
        >
</Auth0Provider>*/

async function main(){
        await ReactDOM.render(
	<Wrapper id = "wrapper"/>
	,
                document.getElementById( 'root' )
        )
        const wrapper = document.getElementById( 'wrapper' )
        ReactDOM.render( <App/>,  wrapper )
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
main()
reportWebVitals();
