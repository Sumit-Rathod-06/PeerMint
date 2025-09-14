import React from 'react'
import Sidebar from '../components/Borrower_Dashboard/Sidebar'
import Header from '../components/Borrower_Dashboard/Header'
import Card1 from '../components/Borrower_Dashboard/Card1'

const Borrowerdashboardpage = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-8">
        <div className="max-w-5xl ml-80 px-4">
          <Card1/>
        </div>
    </div>
  )
}

export default Borrowerdashboardpage