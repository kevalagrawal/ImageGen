import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';

import job from "./configs/cron.js"

// App Config
const PORT = process.env.PORT || 4000
job.start();
const app = express();
await connectDB()

// Intialize Middlewares
app.use(express.json())
app.use(
    cors({
      origin: 'https://globaltrekc.onrender.com', // Use the array
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Include OPTIONS for preflight requests
      allowedHeaders: ["Content-Type", "Authorization", "token"], // Change from string to array
      credentials: true, // Allow cookies if needed
    })
  );
  

// API routes
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)

app.get('/', (req,res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port ' + PORT));
