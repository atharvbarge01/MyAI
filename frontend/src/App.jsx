import { Home } from 'lucide-react'
import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Layout from './pages/Layout.jsx'
import Homepage from './pages/Homepage.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Blog from './pages/Blog.jsx'
import Article from './pages/Article.jsx'
import ImageGen from './pages/ImageGen.jsx'
import ResumeAnalysis from './pages/ResumeAnalysis.jsx'
import Removebg from './pages/Removebg.jsx'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'

function App() {

      const{getToken}=useAuth()
      useEffect(()=>{
        const logToken = async () => {
      const token = await getToken();
      console.log("Your Auth Token:", token);
    };
    logToken();
      
      },[]);
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}/>
        <Route path="/MyAI" element={<Layout />}>
           <Route index element={<Dashboard />} />
           <Route path="Create-Blog" element={<Blog />} />
           <Route path="Create-Article" element={<Article />} />
           <Route path="Generate-Image" element={<ImageGen />} />
           <Route path="Resume-Analysis" element={<ResumeAnalysis />} />
           <Route path="Remove-Background" element={<Removebg />} />
        </Route>
        

      </Routes>
    </div>
  )
}

export default App
