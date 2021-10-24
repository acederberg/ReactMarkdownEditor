import { Auth0Provider } from '@auth0/auth0-react'
import Editor from './markdowns/editMarkdown.js'
import ReactDOM from 'react-dom'
import { createBrowserHistory } from 'history'

export const history = createBrowserHistory()

// Uses the pattern as the markdown render, e.g. render in to wrapper or elsewhere using the function in the next directory up.
export function EditMarkdown( into, collection, _id ){
	//`${ window.location.origin }/edit/${ collection }/${ _id }`
        ReactDOM.render( 
		<Auth0Provider
			domain = { process.env.REACT_APP_AUTH0_DOMAIN }
			clientId = { process.env.REACT_APP_AUTH0_CLIENT_ID }
			redirectUri = { process.env.REACT_APP_AUTH0_REDIRECT_URI }
			onRedirectCallback = { appState => history.replace( appState?.returnTo || window.location.pathname ) }
		>
				<Editor collection = { collection } _id = { _id }/>
		</Auth0Provider>,
		into
	)
}

const Edit = ({match:{params:{ collection, _id }}}) => {
	let wrapper = document.getElementById( 'wrapper' )
	EditMarkdown( wrapper, collection, _id )
	return <div></div>
}

export default Edit ;
