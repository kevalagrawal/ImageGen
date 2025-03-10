import React, { useContext, useState, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { motion } from 'framer-motion'

const Result = () => {
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [isImageLoaded, setIsImageLoaded] = useState(false)
  const [image, setImage] = useState(assets.please)
  const textareaRef = useRef(null)

  const { generateImage } = useContext(AppContext)

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)

    if (input) {
      const newImage = await generateImage(input)
      if (newImage) {
        setIsImageLoaded(true)
        setImage(newImage)
      }
    }
    setLoading(false)
  }

  // Function to clear input and reset UI when clicking "Generate Another"
  const handleGenerateAnother = () => {
    setIsImageLoaded(false)
    setInput('')
  }

  // Function to handle text input and enable scrolling
  const handleInputChange = (e) => {
    setInput(e.target.value)

    // Adjust height dynamically
    const textarea = textareaRef.current
    textarea.style.height = 'auto' // Reset height
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px` // Max height 200px, then scroll
  }

  return (
    <motion.form onSubmit={onSubmitHandler} className='flex flex-col min-h-[90vh] justify-center items-center'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div>
        <div className='relative'>
          <img className='max-w-sm rounded' src={image} alt="Generated Image" />
          <span className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${loading ? 'w-full transition-all duration-[10s]' : 'w-0'}`} />
        </div>
        <p className={!loading ? 'hidden' : ''}>Loading.....</p>
      </div>

      {!isImageLoaded && (
        <div className='flex flex-col w-full max-w-xl bg-neutral-500 text-white text-sm p-3 mt-10 rounded-lg'>
          <textarea
            ref={textareaRef}
            onChange={handleInputChange}
            value={input}
            className='w-full bg-transparent outline-none p-3 text-white placeholder-gray-300 rounded-md resize-none overflow-auto'
            rows={1} // Start with one row
            style={{ maxHeight: '200px' }} // Allow scrolling after max height
            placeholder='Describe what you want to generate...'
          />
          <button type='submit' className='bg-zinc-900 px-10 sm:px-16 py-3 mt-3 rounded-md'>Generate</button>
        </div>
      )}

      {isImageLoaded && (
        <div className='flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full'>
          <p onClick={handleGenerateAnother} className='bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer'>
            Generate Another
          </p>
          <a href={image} download className='bg-zinc-900 px-10 py-3 rounded-full cursor-pointer'>Download</a>
        </div>
      )}
    </motion.form>
  )
}

export default Result
