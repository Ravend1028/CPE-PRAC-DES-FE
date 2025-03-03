import React from 'react';
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
 } from 'react-router';
import Main from './layouts/MainLayout';
import Home from './pages/Home';
import Form from './pages/FormLoader';
import Records from './pages/Records'
import PatientRecord from './pages/PatientRecord';
import AuthLayout from './layouts/AuthLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPass from './pages/ForgotPass';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import UserProfile from './pages/UserProfile';

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
        <Route path = '/' element = { <Main/> }>
          <Route path = '/' element = { <PrivateRoute /> }> {/* This Checks if user loggedin */}
            <Route path = '/dashboard' element = { <Dashboard/> }/>
            <Route path = '/dashboard/profile' element = { <UserProfile /> } />
          </Route>

          {/* if RBAC is added */}
          {/* <Route path = '/records' element = { <Records/> }/>
          <Route path = '/records/:id' element = { <PatientRecord/> }/> */}
        </Route>
      </>
    )
  );

  return (
   <RouterProvider router={ router } />
  )
}

export default App