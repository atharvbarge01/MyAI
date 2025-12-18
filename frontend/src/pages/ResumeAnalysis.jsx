import { Search, SparklesIcon } from 'lucide-react';
import React, { useState } from 'react'

function ResumeAnalysis() {
   const [input,setInput]=useState('')
    const onSubmitHandler=(e)=>{
      e.preventDefault();
    }
  return (
    <div className="bg-gray-50 min-h-screen w-full px-4 py-8">
      <form onSubmit={onSubmitHandler} className="mx-auto w-full max-w-lg p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
  <div className='flex items-center gap-3'>
    <SparklesIcon className='w-6 text-[#96E9E4]'/>
    <h1 className='text-xl font-semibold'>Review Resume</h1>
  </div>
  <p className='mt-6 text-sm font-medium'>Upload Resume</p>
  <input onChange={(e) => setInput(e.target.files[0])} type='file' accept="application/pdf" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Describe what you want to generate' required />
 
   <p className='text-xs text-gray-500 font-light mt-1'> Supports pdf format only</p>
  <button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] w-full flex justify-center items-center gap-2 text-white px-4 py-1 mt-6 border rounded-full cursor-pointer">Review</button>
      </form>

      <div className="flex items-center justify-center mt-6 mx-auto w-full max-w-lg p-6 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[200px] max-h-[600px]">
        <div className='flex flex-col items-center justify-center gap-3'>
          <Search className='w-8 h-8 text-[#14B8A6]'/>
          <h1 className='font-semibold text-lg text-center text-gray-400'>Upload resume and click 'Review' to get Started..</h1>
        </div>
      </div>
    </div>
  )
}

export default ResumeAnalysis
