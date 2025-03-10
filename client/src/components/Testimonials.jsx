import React from "react";
import { assets, testimonialsData } from "../assets/assets";
import { motion } from "framer-motion";

const Testimonials = () => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center my-20 py-12"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">Customer Testimonials</h1>
      <p className="text-gray-500 mb-12">What Our Users Are Saying</p>

      <div className="flex flex-wrap gap-6">
        {testimonialsData.map((testimonial, index) => (
          <motion.div
            key={index}
            className="relative bg-white/30 p-12 rounded-lg shadow-lg border border-gray-200 backdrop-blur-md w-80 m-auto cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-xl hover:border-gray-300"
            whileHover={{ scale: 1.05 }}
          >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-200/10 to-pink-300/10 rounded-lg blur-xl opacity-0 group-hover:opacity-50 transition-all duration-300"></div>

            <div className="flex flex-col items-center relative z-10">
              <img src={testimonial.image} alt="" className="rounded-full w-14 border-2 border-white shadow-md" />
              <h2 className="text-xl font-semibold mt-3">{testimonial.name}</h2>
              <p className="text-gray-500 mb-4">{testimonial.role}</p>

              {/* Animated Stars */}
              <div className="flex mb-4 space-x-1">
                {Array(testimonial.stars)
                  .fill("")
                  .map((_, index) => (
                    <motion.img
                      key={index}
                      src={assets.rating_star}
                      alt=""
                      className="w-5"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.2 }}
                    />
                  ))}
              </div>

              <p className="text-center text-sm text-gray-600">{testimonial.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Testimonials;
