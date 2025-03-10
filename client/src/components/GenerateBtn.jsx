import React, { useContext } from 'react'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const GenerateBtn = () => {

    const { user, setShowLogin } = useContext(AppContext)

    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
            scrollTo(0,0)
        } else {
            scrollTo(0,0)
            setShowLogin(true)
        }
    }

    return (
        <motion.div
    className="pb-16 text-center"
    initial={{ opacity: 0.2, y: 100 }}
    transition={{ duration: 1 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
>
    {/* Title */}
    <h1 className="text-2xl md:text-3xl lg:text-4xl mt-4 font-semibold text-neutral-800 py-6 md:py-16">
        See the magic. Try now
    </h1>

    <button 
        onClick={onClickHandler} 
        className="relative inline-flex items-center gap-2 px-12 py-3 rounded-full text-white m-auto 
                   hover:scale-105 transition-all duration-500 shadow-lg overflow-hidden"
    >
        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                         animate-gradient"></span>
        <span className="relative z-10 flex items-center gap-2">
            Generate Images 
            <img className="h-6" src={assets.star_group} alt="" />
        </span>
    </button>

    {/* CSS for Gradient Animation */}
    <style jsx>{`
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        .animate-gradient {
            background-size: 200% 200%;
            animation: gradientShift 3s infinite linear;
        }
    `}</style>
</motion.div>

    )
}

export default GenerateBtn