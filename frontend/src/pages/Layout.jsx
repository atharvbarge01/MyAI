import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import Sidebar from '../components/Sidebar'
import { SignIn, useUser } from '@clerk/clerk-react'

const Layout=()=> {
    const navigate=useNavigate();
    const [sidebar,setSidebar]=useState(false);
    const {user}=useUser();

  return user ?(
    <div className="h-screen flex flex-col">
        <nav className="w-full flex items-center px-4 sm:px-8 h-16 border-b border-gray-200 justify-between bg-white z-40">
            <img className={'cursor-pointer h-12 w-auto'}src={assets.logo} alt="Logo"  onClick={() => navigate('/')}  />
            {
              sidebar? <X onClick={()=>setSidebar(false)} className="w-7 h-7 sm:hidden cursor-pointer"/> : <Menu className="w-7 h-7 sm:hidden cursor-pointer"onClick={()=>setSidebar(true)}/>
            }
        </nav>

        
          <div className={'flex-1 w-full flex overflow-hidden'}>
            <Sidebar sidebar={sidebar} setSidebar={setSidebar}/>
            <main className={'flex-1 overflow-y-auto'}>
              <Outlet />
          </main>
        </div>
      
    </div>
  ):(
    <div className={'flex-1 justify-center items-center'}>
      <SignIn />
    </div>
  )

}
export default Layout
