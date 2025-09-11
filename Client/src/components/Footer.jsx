import { Blocks } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <div className='bg-gray-800 flex flex-col text-slate-300 p-5 gap-5'>
        <div className='flex md:flex-row flex-col justify-evenly items-center'>
            <div>
                <h5 className='font-semibold mb-2 text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-50'>BeachBuddy</h5>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br className='hidden md:block' />Laborum, quasi ea. Facilis possimus quia natus corrupti molestiae itaque.</p>
            </div>
            <div className='hidden md:block'>
                <p className='mb-4 text-white font-semibold'>Product</p>
                <p>Feature</p>
                <p>Pricing</p>
                <p>API</p>
            </div>
            <div className='hidden md:block'>
                <p className='mb-4 text-white font-semibold'>Company</p>
                <p>About Us</p>
                <p>Careers</p>
                <p>Contact</p>
            </div>
            <div className='hidden md:block'>
                <p className='mb-4 text-white font-semibold'>Legal</p>
                <p>Privacy Policy</p>
                <p>Terms of Service</p>
                <p>Cookie Policy</p>
            </div>
        </div>
        <div>
            <hr className='md:mx-25 mx-15' />
            <p className='text-center my-2'>&#169; 2025 BeachBuddy. All rights reserved.</p>
        </div>
    </div>
  )
}

export default Footer