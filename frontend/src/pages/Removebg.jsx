import { EraserIcon, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import { useAuth } from '@clerk/clerk-react';
import api, { buildAuthHeaders } from '../lib/api';

const Removebg = () => {

  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!file) return;
    try {
      setLoading(true);
      setErrorMsg('');
      const headers = await buildAuthHeaders(getToken);
      const formData = new FormData();
      formData.append('image', file);
      const { data } = await api.post('/api/ai/Remove-Background', formData, {
        headers: { ...headers, 'Content-Type': 'multipart/form-data' }
      });
      if (data?.success) {
        setResult(data.content);
      } else {
        setErrorMsg(data?.message || 'Unknown server response');
      }
    } catch (err) {
      setErrorMsg(err?.response?.data?.message || err?.message || 'Request failed');
    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="bg-gray-50 min-h-screen w-full px-4 py-8">
      <form onSubmit={onSubmitHandler} className="mx-auto w-full max-w-lg p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className='flex items-center gap-3'>
          <Sparkles className='w-6 text-[#96E9E4]' />
          <h1 className='text-xl font-semibold'>Background Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload Image</p>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' accept="image/*" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300' placeholder='Upload image' required />

        <p className='text-xs text-gray-500 font-light mt-1'> Supports jpg,png and other image formats</p>
        <button disabled={loading} className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] w-full flex justify-center items-center gap-2 text-white px-4 py-1 mt-6 border rounded-full cursor-pointer">
          {loading ? 'Processing...' : 'Remove Background'}
        </button>
        {errorMsg ? <div className="mt-2 text-sm text-red-600">{errorMsg}</div> : null}
      </form>

      {!result ? (
        <div className="flex items-center justify-center mt-6 mx-auto w-full max-w-lg p-6 bg-white rounded-lg shadow-sm border border-gray-200 min-h-[200px] max-h-[600px]">
          <div className='flex flex-col items-center justify-center gap-3'>
            <EraserIcon className='w-8 h-8 text-[#14B8A6]' />
            <h1 className='font-semibold text-lg text-center text-gray-400'>Upload Image and click 'Remove Background' to get Started..</h1>
          </div>
        </div>
      ) : (
        <div className="mt-3 h-full overflow-y-auto text-sm text-slate-600 bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex justify-center">
          <img src={result} alt="Background removed" className="max-h-[480px] rounded" />
        </div>
      )}
    </div>
  )
}

export default Removebg
