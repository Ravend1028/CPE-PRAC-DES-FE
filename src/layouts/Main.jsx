import Header from "../components/Header";
import { Outlet } from "react-router";

import React from 'react'

const Main = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Main