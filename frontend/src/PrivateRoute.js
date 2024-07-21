import React from 'react'
import cookies from 'js-cookie'
import { Navigate, Outlet } from 'react-router-dom'

export default function PrivateRoute() {
    const token = cookies.get('access_token')
  return token ? <Outlet /> : <Navigate to='/login' />
}
