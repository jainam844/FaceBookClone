import React from 'react'
import { Route, Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  element: React.ComponentType
  isAuthenticated: boolean
  [rest: string]: any
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      element={
        isAuthenticated ? (
          <Component />
        ) : (
          <Navigate to='./Login' replace state={{ from: rest.location }} />
        )
      }
    />
  )
}

export default ProtectedRoute
