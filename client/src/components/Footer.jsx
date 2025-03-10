import React from 'react'
import { assets } from '../assets/assets'
import { delay, motion } from 'framer-motion'

const Footer = () => {
  return (
    <motion.footer
    className="flex flex-wrap items-center justify-between gap-4 py-4 mt-20 border-t border-gray-300 px-4 sm:px-12"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1 }}
    viewport={{ once: true }}
>
    {/* Logo */}
    <motion.img
        width={150}
        src={assets.logo}
        alt="GlobalTrek Logo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
    />

    {/* Copyright Text */}
    <motion.p
        className="flex-1 border-l border-gray-400 pl-4 text-sm text-gray-500 max-sm:hidden transition-all duration-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        whileHover={{ color: "#333", borderColor: "#666" }}
    >
        Copyright © 2025 GlobalTrek.com | All rights reserved.
    </motion.p>

    {/* Social Icons */}
    <div className="flex gap-3">
        {[
            { src: assets.facebook_icon, alt: "Facebook" },
            { src: assets.twitter_icon, alt: "Twitter" },
            { src: assets.instagram_icon, alt: "Instagram" },
        ].map((item, index) => (
            <motion.img
                key={index}
                width={35}
                src={item.src}
                alt={item.alt}
                className="cursor-pointer transition-all duration-100"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.5 }}
                whileHover={{ scale: 1.2, filter: "brightness(1.2)" }}
            />
        ))}
    </div>
</motion.footer>

  )
}

export default Footer