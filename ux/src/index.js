import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Wrapper from './Wrapper';
import reportWebVitals from './reportWebVitals';
import RenderMarkdown from './MarkdownUtils/RenderMarkdown.js'

ReactDOM.render( <Wrapper id = 'wrapper' />, document.getElementById('root'))

RenderMarkdown( 'test3.md', document.getElementById( 'wrapper' ) )

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
