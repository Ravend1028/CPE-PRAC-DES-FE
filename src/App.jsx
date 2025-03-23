import React from 'react';
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
 } from 'react-router';
import Main from './layouts/MainLayout';
import Home from './pages/Home';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPass from './pages/ForgotPass';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Settings from './pages/Settings';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element = { <Home/>} />
        
        <Route path = '/' element = { <AuthLayout/> }>
          <Route path = '/login' element = { <Login/> } />
          <Route path = '/signup' element = { <Signup/> } />
          <Route path = '/forgot-password' element = { <ForgotPass/> } />
        </Route>
  
        {/* Private Routes */}
        <Route path = '/' element = { <PrivateRoute /> }> {/* This Checks if user loggedin */}
          <Route path = '/' element = { <Main/> }>
            <Route path = '/dashboard' element = { <Dashboard/> }/>
            <Route path = '/settings' element = { <Settings/> }/>
          </Route>
        </Route>
      </>
    )
  );

  return (
   <RouterProvider router={ router } />
  )
}

export default App