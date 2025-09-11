import React from 'react'
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom'; 

const BaseLayout = () => {
  return (
    <div className='w-full min-h-screen bg-slate-100'>
      <Outlet />
    </div>
  )
}

export default BaseLayout