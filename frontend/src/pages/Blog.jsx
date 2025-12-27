import { Edit, Hash } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react'
import api, { buildAuthHeaders } from '../lib/api'
import ReactMarkdown from 'react-markdown';

const Blog = () => {
  const blogCategories = [
    'General', 'Tech', 'Health', 'Travel', 'Finance', 'Lifestyle', 'Food', 'Education', 'Entertainment', 'Sports'
  ]

  const [selectedCategory, setSelectedCategory] = useState('General')
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      setErrorMsg('')
      const headers = await buildAuthHeaders(getToken)
      const prompt = `Write a blog post about "${input}" in the "${selectedCategory}" category. Make it engaging, informative, and well-structured with headings and bullet points where useful.`
      const { data } = await api.post('/api/ai/Create-Blog', { prompt }, { headers })
      if (data?.success) {
        setContent(data.content)
      } else {
        setErrorMsg(data?.message || 'Unknown server response')
      }
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || err?.message || 'Request failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-gray-50 min-h-screen w-full px-4 py-8">
      <form onSubmit={onSubmitHandler} className="mx-auto w-full max-w-lg p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className='flex items-center gap-3'>
          <Hash className='w-6 text-[#96E9E4]' />
          <h1 className='text-xl font-semibold'>Blog Description</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Keywords</p>
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='The Ultimate Guide to a Happy Home' required />
        <p className='mt-4 text-sm font-medium'>Blog Categories</p>
        <div className='flex gap-3 mt-3 flex-wrap sm:max-w-9/11'>
          {blogCategories.map((item, index) => (
            <span onClick={() => setSelectedCategory(item)}
              className={`text-xs border rounded-full px-3 py-1 cursor-pointer ${selectedCategory === item ? 'bg-[#8efaf3] text-gray-700' :
                'text-gray-700 border-gray-400'}`}
              key={index}
            >
              {item}
            </span>
          ))}
        </div>
        <button disabled={loading} className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] w-full flex justify-center items-center gap-2 text-white px-4 py-1 mt-6 border rounded-full cursor-pointer">
          {loading ? 'Generating...' : 'Generate Blog'}
        </button>
        {errorMsg ? <div className="mt-2 text-sm text-red-600">{errorMsg}</div> : null}
      </form>

      {!content ? (
        <div className="flex items-center justify-center mt-6 mx-auto w-full max-w-lg p-6 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[200px] max-h-[600px]">
          <div className='flex flex-col items-center justify-center gap-3'>
            <Edit className='w-8 h-8 text-[#14B8A6]' />
            <h1 className='font-semibold text-lg text-center text-gray-400'>Enter blog description to get started..</h1>
          </div>
        </div>
      ) : (
        <div className="mt-3 h-full overflow-y-auto text-sm text-slate-600 bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="prose prose-sm max-w-none text-slate-800">
            <ReactMarkdown>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </div>
  )
}

export default Blog
