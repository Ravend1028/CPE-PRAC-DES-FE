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

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element = { <Home/>} />

      <Route path = '/' element = { <Main/> }>
        <Route path='/form' element = { <Form/> }/>
        <Route path = 'records' element = { <Records/> }/>
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