import React from 'react'
import { useNavigate } from 'react-router-dom'
import {useUser} from '@clerk/clerk-react'
import { tools } from '../assets/assets';

function Tools() {
    const navigate=useNavigate();
    const {user}=useUser();
  return (
    
    <div className="px-4 sm:px-20 xl:px-32 my-24">
        <div className="text-center">
            <h2 className="font-semibold text-[45px] text-slate-800">All AI Tools</h2>
            <p className='mx-auto mx-w-lg text-gray-600'>Everything You Need to Create, Analyze, and Generate with AI Technology</p>
        </div>
       < div className='flex flex-wrap justify-center mt-15'>
         {tools.map((tool, index)=>(
          <div key={index} className="p-8 m-4 cursor-pointer w-[500px] hover:translate-y-1 transition-all border border-gray-100 shadow-lg mx-w-xs bg-[#FDFDFD]" onClick= {()=>user && navigate(tool.path)}>
            <tool.Icon className={`text-4xl w-12 h-12 mb-4 ${tool.bgColor} p-3 rounded-lg text-primary`}/>
            <h3 className='text-2xl font-semibold mt-6 mb-3 text-slate-800'>{tool.title}</h3>
            <p className='text-gray-600 flex-1'>{tool.description}</p>
          </div>
        ))}
          
       </div>
    </div>
  )
}

export default Tools