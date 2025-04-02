import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import connectDB from './configs/mongodb.js';
import imageRouter from './routes/imageRoutes.js';
import transactionModel from './models/transactionModel.js';
import userModel from './models/userModel.js';

import {job} from "./configs/cron.js"

// App Config
const PORT = process.env.PORT || 4000
job.start();
const app = express();
await connectDB()

// Intialize Middlewares
app.use(express.json())
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow both the production and local origin
      if (origin === 'https://globaltrekc.onrender.com' || origin === 'http://localhost:5173' || !origin) {
        callback(null, true); // allow the origin
      } else {
        callback(new Error('Not allowed by CORS'), false);
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "token"],
    credentials: true,
  })
);

  

// API routes
app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
// API to get user registration data
app.get("/api/users/count", async (req, res) => {
  try {
      const result = await userModel.aggregate([
          {
              $project: {
                  createdAt: 1  // Select only the 'createdAt' field for each user
              }
          },
          { 
              $group: {
                  _id: null, // Group all users together
                  userCount: { $sum: 1 }, // Count the total number of users
                  registrationTimes: { $push: "$createdAt" } // Push the 'createdAt' field for each user
              }
          }
      ]);

      // Return both the user count and the registration times
      res.json(result.length > 0 
        ? { userCount: result[0].userCount, registrationTimes: result[0].registrationTimes }
        : { userCount: 0, registrationTimes: [] });
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});



// API to get transaction data
app.get("/api/transactions/details", async (req, res) => {
  try {
      const transactions = await transactionModel.find({}, 
          "amount payment date createdAt credits plan"
      ).sort({ createdAt: -1 });

      res.json(transactions);
  } catch (err) {
      console.log("Error in the transaction API: ", err);
      res.status(500).json({ error: err.message });
  }
});


app.get('/', (req,res) => res.send("API Working"))

app.listen(PORT, () => console.log('Server running on port ' + PORT));
