import React from 'react'
import { Redirect,Route } from 'react-router';



const PrivateRoute = ({ component: Component,isAuthenticated, ...rest }) => (
  <Route {...rest} render={(props) => (
      isAuthenticated === null
      ? <Redirect to={{
          pathname: '/',
        }} />
      : isAuthenticated.isOwner ? 
      <Component {...props} /> : <Redirect to={{
          pathname: '/properties',
        }} />
  )} />
)

export default PrivateRoute