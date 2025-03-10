import React, { useState } from 'react';
import { stepsData } from '../assets/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react'; // Icons for expanding/collapsing

const Steps = () => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center my-32"
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <h1 className="text-3xl sm:text-4xl font-semibold mb-2">How it works</h1>
      <p className="text-lg text-gray-600 mb-8">Transform Words Into Stunning Images</p>

      <motion.div
        className="space-y-4 w-full max-w-3xl text-sm"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          visible: { transition: { staggerChildren: 0.2 } },
        }}
      >
        {stepsData.map((item, index) => (
          <motion.div
            key={index}
            className="p-5 px-8 bg-white/20 rounded-lg shadow-md border cursor-pointer flex flex-col"
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            {/* Header Section */}
            <div className="flex items-center justify-between">
              {/* Left Section - Icon & Text */}
              <div className="flex items-center gap-4">
                <motion.img
                  width={40}
                  src={item.icon}
                  alt=""
                  initial={{ rotate: 0, scale: 1 }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ duration: 0.3 }}
                />
                <div>
                  <h2 className="text-xl font-medium">{item.title}</h2>
                  <p className="text-gray-500">{item.description}</p>
                </div>
              </div>

              {/* Right Section - Expand Button */}
              <motion.button
                className="p-2 bg-gray-300 rounded-full"
                onClick={() => toggleExpand(index)}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
              >
                {expandedIndex === index ? <Minus size={18} /> : <Plus size={18} />}
              </motion.button>
            </div>

            {/* Expandable Content with Smooth Animation */}
            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  className="mt-3 bg-gray-100 p-3 rounded-lg text-gray-700"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <p>{getExtraInfo(index)}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

// Extra Information for Each Step
const getExtraInfo = (index) => {
  const extraInfo = [
    "Provide a detailed prompt with key details for the best results.",
    "Our AI model applies deep learning to transform text into images.",
    "Download in high resolution and share your AI-generated masterpiece."
  ];
  return extraInfo[index] || "Additional information not available.";
};

export default Steps;
