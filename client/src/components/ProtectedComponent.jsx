import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const ProtectedComponent = ({ component: Component, isAuthenticated }) => (
  <Route
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
    }
  />
)
export default ProtectedComponent
