import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'

export default function ProtectedRoute({ component , ...rest }){
  return <Route
    component = { ( process.env.REACT_APP_AUTH0 === 'false' ) ? component : withAuthenticationRequired( component ) }
    { ...rest }
  />
}
