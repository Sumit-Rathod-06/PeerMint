import React from 'react'
import Hero from '../components/LandingPage/Hero'
import Process from '../components/LandingPage/Process'
import Features from '../components/LandingPage/Features'
import FAQ from '../components/LandingPage/FAQs'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Landingpage = () => {
  return (
    <div className='w-full h-full'>
      <Navbar />
      <Hero />
      <Process />
      <Features />
      <FAQ />
      <Footer />
    </div>
  )
}

export default Landingpage