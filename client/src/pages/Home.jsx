import React from 'react'
import Header from '../components/Header'
import Steps from '../components/Steps'
import Description from '../components/Description'
import Testimonials from '../components/Testimonials'
import GenerateBtn from '../components/GenerateBtn'

const Home = () => {
  return (
    <div 
      className="w-screen h-screen overflow-hidden flex flex-col"
      style={{
        msOverflowStyle: 'none',  // Hide scrollbar for IE and Edge
        scrollbarWidth: 'none'    // Hide scrollbar for Firefox
      }}
    >
      {/* Main Content */}
      <Header />
      <Steps />
      <Description />
      <Testimonials />
      <GenerateBtn />
    </div>
  )
}

export default Home
