import React from 'react'
import Navbar from '../components/Navbar'
import Herosection from '../components/Herosection'
import Tools from '../components/Tools'
import Testimonials from '../components/Testimonials'
import { Subscript } from 'lucide-react'
import Subscription from '../components/Subscription'
import Footer from '../components/Footer'

function Homepage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Herosection />
      <Tools />
      <Testimonials />
     <Subscription />
     <Footer />
    </div>
  )
}

export default Homepage
