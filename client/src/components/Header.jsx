import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { delay, motion } from 'framer-motion'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const { user, setShowLogin } = useContext(AppContext)

    const navigate = useNavigate()

    const onClickHandler = () => {
        if (user) {
            navigate('/result')
        } else {
            setShowLogin(true)
        }
    }

    return (
        <motion.div
    className="flex flex-col justify-center items-center text-center my-20 px-4 sm:px-0"
    initial={{ opacity: 0.2, y: 100 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
>
    {/* Tagline */}
    <motion.div
        className="text-stone-500 inline-flex items-center gap-2 bg-white px-6 py-1 rounded-full border border-neutral-500 shadow-md backdrop-blur-md"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
    >
        <p className="animate-pulse">Revolutionizing AI Image Generation</p>
        <img src={assets.star_icon} alt="Star Icon" />
    </motion.div>

    {/* Main Heading */}
    <motion.h1
        className="text-center mx-auto mt-10 text-4xl max-w-[320px] sm:text-7xl sm:max-w-[600px] font-extrabold leading-tight"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 2 }}
    >
        Transform <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">words</span> into stunning visuals.
    </motion.h1>

    {/* Subtext */}
    <motion.p
        className="text-center max-w-xl mx-auto mt-5 text-gray-600 leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
    >
        Experience the power of AI-powered creativity. Type your thoughts and see them come to life as beautiful, high-resolution images.
    </motion.p>

    {/* Animated Gradient Button */}
    <motion.button
        className="relative sm:text-lg text-white w-auto mt-8 px-12 py-3 flex items-center gap-2 rounded-full 
                   overflow-hidden transition-all duration-500 shadow-lg border border-transparent"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ default: { duration: 0.5 }, opacity: { delay: 0.8, duration: 1 } }}
        onClick={onClickHandler}
    >
        {/* Gradient Background Layer */}
        <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-rose-500 animate-gradient"></span>

        {/* Button Content */}
        <span className="relative z-10 flex items-center gap-2 font-medium tracking-wide">
            Generate Now 
            <img className="h-6" src={assets.star_group} alt="Icon" />
        </span>
    </motion.button>

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

    {/* Image Showcase */}
    <motion.div
    className="flex flex-wrap justify-center mt-16 gap-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 1, duration: 1 }}
>
    {Array.from({ length: 6 }, (_, index) => (
        <motion.img
            className="rounded-lg hover:scale-110 transition-all duration-300 cursor-pointer shadow-md max-sm:w-12"
            width={80}
            key={index}
            src={assets[`download${index + 2}`]} // Dynamically selecting images from assets
            alt={`Download ${index + 2}`}
            whileHover={{ scale: 1.08, boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.2)" }}
        />
    ))}
</motion.div>


    {/* Footer Text */}
    <motion.p
        className="mt-4 text-neutral-600 text-sm italic"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
    >
        Real-time AI-generated images from Imagify.
    </motion.p>
</motion.div>

    )
}

export default Header


// const Header = () => {
//     return (
//         <div className='text-center'>

//             <div className='text-stone-500 mt-14 inline-flex items-center gap-2 bg-white px-5 py-1 rounded-full border border-neutral-500'>
//                 <p>Best text to image generator</p>
//                 <img src={assets.star_icon} alt="" />
//             </div>


//             <h1 className='text-center mx-auto mt-10 text-4xl max-w-[300px] sm:text-6xl sm:max-w-[490px]'>
//                 Turn text to <span className='text-blue-600'>image</span>, in seconds.
//             </h1>

//             <p className='text-center max-w-xl mx-auto mt-5'>Unleash your creativity with AI. Turn your imagination into visual art in seconds - just type, and watch the magic happen.</p>

//             <button className='sm:text-lg text-white bg-black w-auto mt-8 px-12 py-2 rounded-full hover:scale-[1.01] transition-all'>
//                 Generate Images
//             </button>

//             <div className='flex flex-wrap justify-center mt-16 gap-3'>
//                 {Array(6).fill('').map((item, index) => (
//                     <img className='rounded hover:scale-105 transition-all duration-300 cursor-pointer' width={70} key={index} src={index % 2 === 0 ? assets.sample_img_2 : assets.sample_img_1} />
//                 ))}
//             </div>
//             <p className='mt-2 text-neutral-600'>Generated images from imagify</p>
//         </div>
//     )
// }

// export default Header