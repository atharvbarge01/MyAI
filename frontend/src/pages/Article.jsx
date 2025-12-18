import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'

const Article=()=> {

  const articleLength=[
    { length:200 ,text:'Short (200-400 words)'},
    { length:400,text:'Medium (400-800 words)'},
    { length:800 ,text:'Long (800-1500 words)'},
    { length:1500,text:'Very Long (1500+ words)'}, 
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0].length);
  const [input,setInput]=useState('')
  const onSubmitHandler=(e)=>{
    e.preventDefault();
  }

  
  return (
    <div className="bg-gray-50 min-h-screen w-full px-4 py-8">
      <form onSubmit={onSubmitHandler} className="mx-auto w-full max-w-lg p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
  <div className='flex items-center gap-3'>
    <Sparkles className='w-6 text-[#14B8A6]'/>
    <h1 className='text-xl font-semibold'>Article Configuration</h1>
  </div>
  <p className='mt-6 text-sm font-medium'>Article Topic</p>
  <input onClick={(e)=> setType(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Generate Article about...' required />
  <p className='mt-4 text-sm font-medium'>Article Length</p>
   <div className='flex gap-3 mt-3 flex-wrap sm:max-w-9/11'>
          {articleLength.map((item, index) => (
            <span onClick={()=> setSelectedLength(item)}
              className={`text-xs border rounded-full px-3 py-1 cursor-pointer ${selectedLength.text === item.text ? 'bg-[#C6F5EE] text-gray-700' :
            'text-gray-700 border-gray-400'}}`}
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>
        <button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] w-full flex justify-center items-center gap-2 text-white px-4 py-1 mt-6 boarder rounded-full cursor-pointer">Generate Article</button>
      </form>

      <div className="flex items-center justify-center mt-6 mx-auto w-full max-w-lg p-6 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[200px] max-h-[600px]">
        <div className='flex flex-col items-center justify-center gap-3'>
          <Edit className='w-8 h-8 text-[#14B8A6]'/>
          <h1 className='font-semibold text-lg text-center text-gray-400'>Enter topic to get started..</h1>
        </div>
      </div>
    </div>
  )
}

export default Article
