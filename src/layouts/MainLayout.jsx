import React from 'react';
import Header from "../components/Header";
import { Outlet } from "react-router";

const Main = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default Main