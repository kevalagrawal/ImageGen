import React, { useContext, useState } from 'react'
import { assets, plans } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import { motion } from 'framer-motion'

const BuyCredit = () => {

  const { backendUrl, loadCreditsData, user, token, setShowLogin } = useContext(AppContext)
  const [loadingStates, setLoadingStates] = useState({})

  const navigate = useNavigate()

  const initPay = async (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Credits Payment',
      description: "Credits Payment",
      order_id: order.id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          const { data } = await axios.post(backendUrl + '/api/user/verify-razor', response, { headers: { token } })
          if (data.success) {
            loadCreditsData()
            navigate('/')
            toast.success('Credit Added')
          }
        } catch (error) {
          toast.error(error.message)
        }
      }
    }

    const rzp = new window.Razorpay(options)
    rzp.open()
  }

  const paymentRazorpay = async (planId) => {
    try {
      if (!user) {
        setShowLogin(true);
        return;
      }
  
      // Set loading state to true
      setLoadingStates((prev) => ({ ...prev, [planId]: true }));
  
      // Hide the loading state after 0.5s regardless of request completion
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [planId]: false }));
      }, 1000);
  
      const { data } = await axios.post(backendUrl + '/api/user/pay-razor', { planId }, { headers: { token } });
      if (data.success) initPay(data.order);
    } catch (error) {
      toast.error(error.message);
    }
  };
  
  const paymentStripe = async (planId) => {
    try {
      // Set loading state to true
      setLoadingStates((prev) => ({ ...prev, [planId]: true }));
  
      // Hide the loading state after 0.5s regardless of request completion
      setTimeout(() => {
        setLoadingStates((prev) => ({ ...prev, [planId]: false }));
      }, 1000);
  
      const { data } = await axios.post(backendUrl + '/api/user/pay-stripe', { planId }, { headers: { token } });
      if (data.success) {
        window.location.replace(data.session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  

  return (
    <motion.div className='min-h-[80vh] text-center pt-14 mb-10'
      initial={{ opacity: 0.2, y: 100 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <button className='border border-gray-400 px-10 py-2 rounded-full mb-6'>Our Plans</button>
      <h1 className='text-center text-3xl font-medium mb-6 sm:mb-10'>Choose the plan</h1>
      <div className='flex flex-wrap justify-center gap-6 text-left'>
        {plans.map((item, index) => (
          <div 
            className='relative bg-white drop-shadow-sm border rounded-lg py-12 px-8 text-gray-600 hover:scale-105 transition-all duration-500' 
            key={index}
          >
            {/* Ribbon inside the box */}
            <motion.div 
              className="absolute top-0 left-0 bg-[#8B0000] text-white text-xs font-bold py-2 px-6 shadow-lg"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)'
              }}
              animate={{ y: [0, -3, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              LIMITED OFFER
            </motion.div>

            <img width={40} src={assets.logo_icon} alt="" />
            <p className='mt-3 mb-1 font-semibold'>{item.id}</p>
            <p className='text-sm'>{item.desc}</p>
            <p className='mt-6'>
              <span className='text-3xl font-medium'>₹{item.price}</span>/ 
              <span className="line-through text-gray-400 mx-1">
                {index === 0 ? 25 : index === 1 ? 50 : 100}
              </span>
              {item.credits} credits
            </p>
            <div className='flex flex-col mt-4'>
              <button 
                onClick={() => paymentRazorpay(item.id)} 
                className={`w-full bg-gray-800 text-white mt-8 text-sm rounded-md py-2.5 min-w-52 ${
                  loadingStates[item.id] ? 'opacity-60 cursor-not-allowed' : ''
                }`}
                disabled={loadingStates[item.id]}
              >
                {loadingStates[item.id] ? (
                  <div className="flex items-center justify-center gap-2">
                    <svg 
                      className="animate-spin h-5 w-5 text-white" 
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12" cy="12" r="10"
                        stroke="currentColor" strokeWidth="4"
                        fill="none"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C6.48 0 2 4.48 2 10h2zm2 5.292A7.961 7.961 0 014 12H2c0 2.717 1.122 5.193 2.928 6.98L6 17.292z"
                      ></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  user ? 'Buy Now' : 'Get Started'
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default BuyCredit
