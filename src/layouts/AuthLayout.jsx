import React from 'react';
import AuthHeader from '../components/AuthHeader';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <>
      <AuthHeader />
      <Outlet />
    </>
  )
}

export default AuthLayout