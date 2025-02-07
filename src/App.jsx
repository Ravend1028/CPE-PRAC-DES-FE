import React from 'react';
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
 } from 'react-router';
 import Main from './layouts/Main';
 import Home from './pages/Home';
 import Form from './pages/FormLoader';
 import Records from './pages/Records'
 import PatientRecord from './pages/PatientRecord';
 import Readings from './pages/Readings';

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route index element = { <Home/>} />
  
        <Route path = '/' element = { <Main/> }>
          <Route path = '/form-loader' element = { <Form/> }/>
          <Route path = '/form-loader/readings' element = { <Readings/> }/>
          <Route path = '/records' element = { <Records/> }/>
          <Route path = '/records/:id' element = { <PatientRecord/> }/>
        </Route>
      </>
    )
  );

  return (
   <RouterProvider router={ router } />
  )
}

export default App