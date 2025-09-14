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
      <section id="hero">
        <Hero />
      </section>
      <section id="process">
        <Process />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="faq">
        <FAQ />
      </section>
      <section id="contact">
        <Footer />
      </section>
    </div>
  )
}

export default Landingpage
