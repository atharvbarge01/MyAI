import { useClerk, useUser, } from '@clerk/clerk-react';
import { FileTextIcon, Hash, Home, ImageIcon, LogOut, PenBoxIcon, ScissorsLineDashedIcon } from 'lucide-react';
import React from 'react'
import { NavLink } from 'react-router-dom';

const sidebarItems = [
  { to: '/MyAI', label: 'Dashboard', Icon: Home },
  { to: '/MyAI/Generate-Image', label: 'Generate Image', Icon: ImageIcon },
  { to: '/MyAI/Create-Article', label: 'Create Article', Icon: PenBoxIcon },
  { to: '/MyAI/Create-Blog', label: 'Create Blog', Icon: Hash },
  { to: '/MyAI/Remove-Background', label: 'Remove Background', Icon: ScissorsLineDashedIcon },
  { to: '/MyAI/Resume-Analysis', label: 'Analyze Resume', Icon: FileTextIcon },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  return (
    <div
      className={`w-64 bg-white border-r border-gray-200 flex flex-col 
      justify-between transition-transform duration-300 ease-in-out 
      sm:translate-x-0 ${sidebar ? 'translate-x-0' : '-translate-x-full'} 
      absolute sm:static h-full z-30`}
    >
      <div className="my-7 w-full">
        <img
          src={user.imageUrl}
          alt="img"
          className="w-12 h-12 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center">{user.username}</h1>
        <div className='px-6 mt-5 text-sm text-gray-600 font-medium'>
          {sidebarItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/MyAI'}
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${isActive
                  ? 'bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white'
                  : ''
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                  {label}
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>
      <div className='w-full border-t border-gray-200 p-4 px-7 flex items-center justify-between'>
        <div onClick={openUserProfile} className='flex gap-2 items-center cursor-pointer'>
          <img src={user.imageUrl} className='w-8 rounded-full' alt="" />
          <div>
            <h1 className='text-sm font-medium'>{user.username}</h1>
            <p className='text-xs text-gray-500'></p>
          </div>
         
        </div>

        <LogOut
          onClick={signOut}
          className='w-4.5 text-gray-400 hover:text-gray-700 transition cursor-pointer'
        />
      </div>

    </div>
  );


}

export default Sidebar
