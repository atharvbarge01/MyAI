import React from 'react'
import { useNavigate } from 'react-router-dom';

function Herosection() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen px-4 xl:px-32 sm:px-20 pt-20 relative bg-[url(/background.png)] bg-cover bg-center bg-no-repeat'>
      {/* Main Content Container */}
      <div className='flex flex-col items-center justify-center text-center max-w-6xl mx-auto space-y-8 mt-16'>
        {/* Hero Text */}
        <div className='space-y-6'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight'>
            From Ideas to Creation with <br />
            <span className='text-primary'>My.AI</span>
          </h1>
          <p className='text-lg sm:text-xl md:text-2xl font-medium text-gray-600 max-w-4xl mx-auto leading-relaxed'>
            Transform your concepts into stunning content in seconds.<br />
            Create, Analyze, and Generate with AI
          </p>
        </div>

        {/* CTA Button */}
        <div className='flex justify-center'>
          <button 
            onClick={() => navigate('/MyAI')} 
            className='bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg'
          >
            Get Started
          </button>
        </div>

        {/* Trust Badge */}
        <div className='flex items-center justify-center mt-8'>
          <p className='text-gray-500 text-sm font-medium'>Trusted by 5K+ people</p>
        </div>
      </div>
    </div>
  )
}

export default Herosection
