import { ArrowRight } from 'lucide-react'
import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { UserButton, useClerk, useUser } from '@clerk/clerk-react'

  

function Navbar() {
    const {user} = useUser();
    const {openSignIn, openSignUp} = useClerk();
    const navigate = useNavigate(); 

  return (
    <div className="fixed z-50 w-full backdrop-blur-xl bg-gray-50/90">
      <div className="flex justify-between items-center py-4 px-8 xl:px-16 sm:px-12 w-full">
        <img 
          src={assets.logo} 
          alt="logo" 
          onClick={() => navigate('/')} 
          className='h-12 w-auto cursor-pointer hover:opacity-80 transition-opacity'
        />
        {
          user ? (
            <UserButton />
          ) : (
            <button 
              onClick={openSignIn}
              className='flex items-center gap-2 bg-primary hover:bg-primary/90 text-white rounded-full px-6 py-3 font-medium transition-all duration-300 transform hover:scale-105 shadow-md'
            > 
              Start Generation 
              <ArrowRight className='w-4 h-4'/>
            </button>
          )
        }
      </div>
    </div>
  )
}

export default Navbar
