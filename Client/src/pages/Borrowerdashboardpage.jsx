import React from 'react'
import Sidebar from '../components/Borrower_Dashboard/Sidebar'
import Header from '../components/Borrower_Dashboard/Header'
import Card1 from '../components/Borrower_Dashboard/Card1'

const Borrowerdashboardpage = () => {
  return (
    <>
        <div className='absolute'>
            <Sidebar/>
        </div>
        <Header/>
        <Card1/>
    </>

    
    
  )
}

export default Borrowerdashboardpage