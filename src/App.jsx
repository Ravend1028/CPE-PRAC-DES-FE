import React from 'react';
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
 } from 'react-router';
 import Main from './layouts/Main';
 import Home from './pages/Home';
 import Form from './pages/Form';
 import Records from './pages/Records'
 import PatientRecord from './pages/PatientRecord';
 import Readings from './pages/Readings';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element = { <Home/>} />

      <Route path = '/' element = { <Main/> }>
        <Route path = '/form' element = { <Form/> }/>
        <Route path = '/form/readings' element = { <Readings/> }/>
        <Route path = '/records' element = { <Records/> }/>
        <Route path = '/records/:id' element = { <PatientRecord/> }/>
      </Route>
    </>
  )
);

const App = () => {
  return (
   <RouterProvider router={ router } />
  )
}

export default App