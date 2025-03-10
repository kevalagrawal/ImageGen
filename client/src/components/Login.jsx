import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const Login = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { backendUrl, setShowLogin, setToken, setUser } = useContext(AppContext);

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
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
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
      className="fixed inset-0 z-50 flex justify-center items-center bg-black/50 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Login Box */}
      <motion.form
        onSubmit={onSubmitHandler}
        className="relative bg-[#1A1D2E] p-10 rounded-2xl text-white shadow-2xl w-96 backdrop-blur-lg"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* Close Button */}
        <motion.img
          onClick={() => setShowLogin(false)}
          className="absolute top-4 right-4 w-6 cursor-pointer opacity-80 hover:opacity-100 transition transform hover:rotate-90"
          src={assets.cross_icon}
          alt=""
        />

        {/* Title */}
        <motion.h1
          className="text-center text-3xl font-bold text-blue-500 mb-2"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {state}
        </motion.h1>
        <p className="text-sm text-gray-300 text-center">
          Welcome! Please {state.toLowerCase()} to continue.
        </p>

        {/* Name Field (Only for Sign Up) */}
        {state !== "Login" && (
          <motion.div
            className="border border-gray-600 px-5 py-2 flex items-center gap-3 rounded-full mt-5 bg-gray-800 focus-within:border-blue-500 transition-all"
            whileFocus={{ scale: 1.02 }}
          >
            <img src={assets.user_icon} alt="" className="w-5 opacity-80" />
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="outline-none text-sm bg-transparent flex-1 placeholder-gray-400 text-white"
              type="text"
              placeholder="Full Name"
              required
            />
          </motion.div>
        )}

        {/* Email Field */}
        <motion.div
          className="border border-gray-600 px-5 py-2 flex items-center gap-3 rounded-full mt-4 bg-gray-800 focus-within:border-blue-500 transition-all"
          whileFocus={{ scale: 1.02 }}
        >
          <img src={assets.email_icon} alt="" className="w-5 opacity-80" />
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="outline-none text-sm bg-transparent flex-1 placeholder-gray-400 text-white"
            type="email"
            placeholder="Email"
            required
          />
        </motion.div>

        {/* Password Field */}
        <motion.div
          className="border border-gray-600 px-5 py-2 flex items-center gap-3 rounded-full mt-4 bg-gray-800 focus-within:border-blue-500 transition-all"
          whileFocus={{ scale: 1.02 }}
        >
          <img src={assets.lock_icon} alt="" className="w-5 opacity-80" />
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="outline-none text-sm bg-transparent flex-1 placeholder-gray-400 text-white"
            type="password"
            placeholder="Password"
            required
          />
        </motion.div>

        {/* Forgot Password */}
        <p className="text-sm text-blue-400 my-4 text-right cursor-pointer hover:underline transition">
          Forgot password?
        </p>

        {/* Submit Button */}
        <motion.button
          className="bg-blue-500 w-full text-white font-bold py-2 rounded-full text-lg mt-4 shadow-md hover:bg-blue-400"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {state === "Login" ? "Login" : "Create Account"}
        </motion.button>

        {/* Toggle Between Login & Sign Up */}
        {state === "Login" ? (
          <p className="mt-5 text-center text-gray-300">
            Don't have an account?{" "}
            <span
              onClick={() => setState("Sign Up")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Sign up
            </span>
          </p>
        ) : (
          <p className="mt-5 text-center text-gray-300">
            Already have an account?{" "}
            <span
              onClick={() => setState("Login")}
              className="text-blue-400 cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>
        )}
      </motion.form>
    </motion.div>
  );
};

export default Login;
