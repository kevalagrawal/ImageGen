import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const [state, setState] = useState("Login");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false); // New state

  const { backendUrl, setShowLogin, setToken, setUser } = useContext(AppContext);

  // Handle Login or Sign Up Submission
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const endpoint = state === "Login" ? "/api/user/login" : "/api/user/register";
      const payload = state === "Login" ? { email, password } : { name, email, password };

      const { data } = await axios.post(backendUrl + endpoint, payload);

      if (data.success) {
        setToken(data.token);
        setUser(data.user);
        localStorage.setItem("token", data.token);
        setShowLogin(false);
        toast.success(`${state} successful!`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle Forgot Password Submission
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/forgot-password`, { email });

      if (data.success) {
        toast.success("Password reset email sent successfully. Please check your spam folder.");
        setIsForgotPassword(false); // Close the forgot password form after success
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to send password reset email.");
    }
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* FORM CONTAINER */}
      <motion.form
        onSubmit={isForgotPassword ? handleForgotPassword : onSubmitHandler}
        className="relative bg-[#1A1D2E] p-8 md:p-10 rounded-2xl text-white shadow-2xl max-w-sm w-full backdrop-blur-lg transition-all duration-300"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Close Button */}
        <motion.img
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 w-5 md:w-6 cursor-pointer opacity-80 hover:opacity-100 transition transform hover:rotate-90"
          src={assets.cross_icon}
          alt="Close"
        />

        {/* Title */}
        <motion.h1
          className="text-center text-2xl md:text-3xl font-bold text-blue-500 mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {isForgotPassword ? "Forgot Password" : state}
        </motion.h1>
        <p className="text-sm text-gray-300 text-center">
          {isForgotPassword
            ? "Enter your email to reset your password."
            : `Welcome! Please ${state.toLowerCase()} to continue.`}
        </p>

        {/* Name Field (Only for Sign Up) */}
        {!isForgotPassword && state !== "Login" && (
          <motion.div
            className="border border-gray-600 px-4 py-2 flex items-center gap-3 rounded-full mt-5 bg-gray-800 focus-within:border-blue-500 transition-all"
            whileFocus={{ scale: 1.02 }}
          >
            <img src={assets.user_icon1} alt="User" className="w-4 md:w-5 opacity-80" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none text-sm md:text-base bg-transparent flex-1 placeholder-gray-400 text-white"
              type="text"
              placeholder="Full Name"
              required
            />
          </motion.div>
        )}

        {/* Email Field */}
        <motion.div
          className="border border-gray-600 px-4 py-2 flex items-center gap-3 rounded-full mt-4 bg-gray-800 focus-within:border-blue-500 transition-all"
          whileFocus={{ scale: 1.02 }}
        >
          <img src={assets.email_icon} alt="Email" className="w-4 md:w-5 opacity-80" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none text-sm md:text-base bg-transparent flex-1 placeholder-gray-400 text-white"
            type="email"
            placeholder="Email"
            required
          />
        </motion.div>

        {/* Password Field */}
        {!isForgotPassword && (
          <motion.div
            className="border border-gray-600 px-4 py-2 flex items-center gap-3 rounded-full mt-4 bg-gray-800 focus-within:border-blue-500 transition-all"
            whileFocus={{ scale: 1.02 }}
          >
            <img src={assets.lock_icon} alt="Password" className="w-4 md:w-5 opacity-80" />
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="outline-none text-sm md:text-base bg-transparent flex-1 placeholder-gray-400 text-white"
              type="password"
              placeholder="Password"
              required
            />
          </motion.div>
        )}

        {/* Forgot Password Link */}
        {!isForgotPassword && state === "Login" && (
          <p
            className="text-sm text-blue-400 my-4 text-right cursor-pointer hover:underline transition"
            onClick={() => setIsForgotPassword(true)}
          >
            Forgot password?
          </p>
        )}

        {/* Submit Button */}
        <motion.button
          className="bg-blue-500 w-full text-white font-bold py-2 rounded-full text-lg mt-4 shadow-md hover:bg-blue-400 transition duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isForgotPassword ? "Reset Password" : state === "Login" ? "Login" : "Create Account"}
        </motion.button>
      </motion.form>
    </motion.div>
  );
};

export default Login;
