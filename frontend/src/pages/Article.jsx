import { Edit, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react';
import api, { buildAuthHeaders } from '../lib/api';
import ReactMarkdown from 'react-markdown';

const Article = () => {

  const articleLength = [
    { length: 400, text: 'Short (200-400 words)' },
    { length: 800, text: 'Medium (400-800 words)' },
    { length: 1500, text: 'Long (800-1500 words)' },
    { length: 3000, text: 'Very Long (1500+ words)' },
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  const { getToken } = useAuth();
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setErrorMsg('');
      console.log('Submitting article generation', { input, selectedLength });
      const headers = await buildAuthHeaders(getToken);
      const prompt = `Write a comprehensive and detailed article about "${input}". The target length is approximately ${selectedLength.length} words.
      
      Structure the article as follows to ensure depth and length:
      1.  **Engaging Title**: Create a catchy and relevant title.
      2.  **Introduction**: Provide context, background, and a clear thesis statement.
      3.  **Core Analysis (Multiple Sections)**: Break down the topic into at least 4-6 detailed sections with descriptive subheadings. explore different angles, pros/cons, historical context, or future implications.
      4.  **Examples & Case Studies**: Include hypothetical or real-world examples to illustrate key points.
      5.  **Conclusion**: Summarize the main takeaways and provide a thought-provoking closing.

      Use bullet points for readability but focus on long-form paragraphs. The tone should be professional, authoritative, yet accessible.`

      const { data } = await api.post('/api/ai/Create-Article', { prompt, length: selectedLength.length }, { headers })

      if (data?.success) {
        setContent(data.content)
      } else {
        const msg = data?.message || 'Unknown server response';
        console.error('API error', msg, data);
        setErrorMsg(msg);
      }

    } catch (error) {
      console.error('Request failed', error);
      setErrorMsg(error?.message || 'Request failed');
    }
    setLoading(false)
  }



  return (
    <div className="bg-gray-50 min-h-screen w-full px-4 py-8">
      <form onSubmit={onSubmitHandler} className="mx-auto w-full max-w-lg p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#14B8A6]' />
          <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Article Topic</p>
        <input onChange={(e) => setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Generate Article about...' required />
        <p className='mt-4 text-sm font-medium'>Article Length</p>
        <div className='flex gap-3 mt-3 flex-wrap sm:max-w-9/11'>
          {articleLength.map((item, index) => (
            <span onClick={() => setSelectedLength(item)}
              className={`text-xs border rounded-full px-3 py-1 cursor-pointer ${selectedLength.text === item.text ? 'bg-[#C6F5EE] text-gray-700' :
                'text-gray-700 border-gray-400'}}`}
              key={index}
            >
              {item.text}
            </span>
          ))}
        </div>
        <button type="submit" disabled={loading} className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] w-full flex justify-center items-center gap-2 text-white px-4 py-1 mt-6 border rounded-full cursor-pointer">
          {loading ? 'Generating...' : 'Generate Article'}
        </button>
        {errorMsg ? (
          <div className="mt-2 text-sm text-red-600">{errorMsg}</div>
        ) : null}
      </form>
      {!content ? (
        <div className="flex items-center justify-center mt-6 mx-auto w-full max-w-lg p-6 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[200px] max-h-[600px]">
          <div className='flex flex-col items-center justify-center gap-3'>
            <Edit className='w-8 h-8 text-[#14B8A6]' />
            <h1 className='font-semibold text-lg text-center text-gray-400'>Enter topic to get started..</h1>
          </div>
        </div>
      ) : (
        <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-600">
          <div>
            <div className="prose prose-sm max-w-none text-slate-800">
              <ReactMarkdown>
                {content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Article
