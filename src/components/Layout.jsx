import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";


const Layout = () => {
  // layout for the page 
  return (
    <>
      <div className='flex flex-col h-screen overflow-hidden'>
        <Header />
        <div className='overflow-y-auto'>
          {/* Sidebar - Fixed Position */}
          <div className='fixed h-full'>
            <Sidebar />
          </div>
          <div className="">
            {/* for nested routes */}
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}

export default Layout;