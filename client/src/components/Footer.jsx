import React from 'react'

const Footer = () => {
  return (
    <footer className="w-full text-black py-6 mt-10" style={{ backgroundColor: 'rgb(247, 250, 244)' }}>
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        {/* Left Section */}
        <div className="text-center sm:text-left">
          <h3 className="text-lg font-semibold">GlobalTrek</h3>
          <p className="text-gray-500 mt-1">Delivering excellence worldwide</p>
        </div>

        {/* Center Section */}
        <div className="text-center mt-4 sm:mt-0">
          <p className="text-gray-500">Contact us:</p>
          <a 
            href="mailto:globaltrek39@gmail.com"
            className="text-blue-500 hover:text-blue-600 transition duration-300"
          >
            globaltrek39@gmail.com
          </a>
        </div>

        {/* Right Section */}
        <div className="text-center sm:text-right mt-4 sm:mt-0">
          <p className="text-gray-500">&copy; {new Date().getFullYear()} GlobalTrek. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
