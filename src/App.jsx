import React from 'react';
import { 
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
 } from 'react-router';
 import Main from './layouts/Main';
 import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element = { <Home/>} />

      <Route path = '/' element = { <Main/> }>
        <Route path = '' element/>
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