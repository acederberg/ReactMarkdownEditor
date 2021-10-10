import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Wrapper from './components/wrapper.js'

async function main(){
        await ReactDOM.render(
                <Wrapper id = "wrapper"/>,
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
