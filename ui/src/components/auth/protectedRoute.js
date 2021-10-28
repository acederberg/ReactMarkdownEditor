import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'


export default function ProtectedRoute({ component , ...rest }){
        return <Route
                component = { withAuthenticationRequired( component ) }
                { ...rest }
        >
        </Route>

}
