import React from 'react'
// import { PricingTable } from '@clerk/clerk-react'

function Subscription() {
  return (
    
  <div className="px-2 sm:px-20 xl:px-22 my-8 pt-8">
        <div className="text-center">
          <h2 className="font-semibold text-[45px] text-slate-800">Subscription Plans</h2>
          <p className="mx-auto max-w-lg text-gray-600 mb-10">Everything You Need to Create, Analyze, and Generate with AI Technology</p>
        </div>

        {/* <div className="max-w-4xl mx-auto"> */}
          {/* <PricingTable /> */}
        {/* </div> */}
          
    <div className="flex justify-center bg-gray-50 px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full mx-auto ">
        
        {/* Free Plan */}
        <div className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition">
          <h2 className="text-2xl font-semibold mb-2">Free</h2>
          <p className="text-gray-500 mb-4">Get started with the basics at no cost.</p>
          <p className="text-3xl font-bold mb-6">$0<span className="text-lg font-medium"> / month</span></p>
          <button className="w-full bg-primary text-white py-2 rounded-xl font-medium hover:bg-gray-900">
            Get Free
          </button>
          <ul className="mt-6 space-y-3 text-gray-600">
            <li>✔ Create Blogs</li>
            <li>✔ Create Articles</li>
            <li>✔ Remove Image Background</li>
            
          </ul>
        </div>

        {/* $1 Plan */}
        <div className="bg-white shadow-lg rounded-2xl p-6  border-gray-200 hover:shadow-2xl transition relative">
          <span className="absolute top-4 right-4 bg-primary text-white text-xs px-2 py-1 rounded-full">
            Popular
          </span>
          <h2 className="text-2xl font-semibold mb-2">Pro Lite</h2>
          <p className="text-gray-500 mb-4">Upgrade productivity with premium tools.</p>
          <p className="text-3xl font-bold mb-6">$1<span className="text-lg font-medium"> / month</span></p>
          <button className="w-full bg-primary text-white py-2 rounded-xl font-medium hover:bg-black">
            Get Pro 
          </button>
          <ul className="mt-6 space-y-3 text-gray-600">
             <li>✔ Create Blogs</li>
            <li>✔ Create Articles</li>
            <li>✔ Remove Image Background</li>
            <li>✔ Generate Images</li>
            <li>✔ Resume Analyser</li>
          </ul>
        </div>
      </div>
    </div>
      </div>
  )
}

export default Subscription
