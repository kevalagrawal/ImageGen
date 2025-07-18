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
    setImage(assets.please);
  }

  // Function to handle text input and enable scrolling
  const handleInputChange = (e) => {
    setInput(e.target.value)

    // Adjust height dynamically
    const textarea = textareaRef.current
    textarea.style.height = 'auto'
    textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
  }

  return (
    <motion.form
      onSubmit={onSubmitHandler}
      className="flex flex-col min-h-[90vh] justify-center items-center relative overflow-hidden"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <div className="relative">
        {/* Image Container */}
        <div className="relative w-[300px] h-[300px]"> 
          <img
            className="w-full h-full object-cover rounded"
            src={image}
            alt="Generated Image"
          />
          {/* Loading Overlay - Matches the size of the sample image */}
          {loading && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-md flex justify-center items-center rounded">
              <motion.div
                className="text-white text-xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ repeat: Infinity, duration: 1 }}
              >
                <div className="flex flex-col items-center gap-3">
                  {/* Spinning loader */}
                  <div className="w-10 h-10 border-t-4 border-white border-solid rounded-full animate-spin"></div>
                  Generating...
                </div>
              </motion.div>
            </div>
          )}
          {/* Progress Bar
          <span
            className={`absolute bottom-0 left-0 h-1 bg-blue-500 ${
              loading ? 'w-full transition-all duration-[10s]' : 'w-0'
            }`}
          /> */}
        </div>
      </div>

      {/* Input & Generate Button */}
      {!isImageLoaded && (
        <div className="flex flex-col w-full max-w-xl bg-neutral-500 text-white text-sm p-3 mt-10 rounded-lg">
          <textarea
            ref={textareaRef}
            onChange={handleInputChange}
            value={input}
            className="w-full bg-transparent outline-none p-3 text-white placeholder-gray-300 rounded-md resize-none overflow-auto"
            rows={1}
            style={{ maxHeight: '200px' }}
            placeholder="Describe what you want to generate..."
            disabled={loading}
          />
          <button
            type="submit"
            className={`px-10 sm:px-16 py-3 mt-3 rounded-md ${
              loading
                ? 'bg-gray-700 cursor-not-allowed'
                : 'bg-zinc-900 hover:bg-zinc-800'
            }`}
            disabled={loading}
          >
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </div>
      )}

      {/* Generate Another & Download Button */}
      {isImageLoaded && (
        <div className="flex gap-2 flex-wrap justify-center text-white text-sm p-0.5 mt-10 rounded-full">
          <p
            onClick={handleGenerateAnother}
            className="bg-transparent border border-zinc-900 text-black px-8 py-3 rounded-full cursor-pointer"
          >
            Generate Another
          </p>
          <a
            href={image}
            download
            className="bg-zinc-900 px-10 py-3 rounded-full cursor-pointer"
          >
            Download
          </a>
        </div>
      )}
    </motion.form>
  )
}

export default Result
