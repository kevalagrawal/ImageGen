import userModel from "../models/userModel.js"
import transactionModel from "../models/transactionModel.js"
import razorpay from 'razorpay';
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'
// import stripe from "stripe";

// API to register user
const registerUser = async (req, res) => {

    try {
        const { name, email, password } = req.body;

        // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const userData = {
            name,
            email,
            password: hashedPassword,
        }

        const newUser = new userModel(userData)
        const user = await newUser.save()

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token, user: { name: user.name } })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to login user
const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "User does not exist" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token, user: { name: user.name } })
        }
        else {
            res.json({ success: false, message: "Invalid credentials" })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API Controller function to get user available credits data
const userCredits = async (req, res) => {
    try {

        const { userId } = req.body

        // Fetching userdata using userId
        const user = await userModel.findById(userId)
        res.json({ success: true, credits: user.creditBalance, user: { name: user.name } })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message })
    }
}

// razorpay gateway initialize
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
});


// Payment API to add credits
const paymentRazorpay = async (req, res) => {
    try {

        const { userId, planId } = req.body

        const userData = await userModel.findById(userId)

        // checking for planId and userdata
        if (!userData || !planId) {
            return res.json({ success: false, message: 'Missing Details' })
        }

        let credits, plan, amount, date

        // Switch Cases for different plans
        switch (planId) {
            case 'Basic':
                plan = 'Basic'
                credits = 50
                amount = 9
                break;

            case 'Advanced':
                plan = 'Advanced'
                credits = 150
                amount = 29
                break;

            case 'Business':
                plan = 'Business'
                credits = 500
                amount = 69
                break;

            default:
                return res.json({ success: false, message: 'plan not found' })
        }

        date = Date.now()

        // Creating Transaction Data
        const transactionData = {
            userId,
            plan,
            amount,
            credits,
            date
        }

        // Saving Transaction Data to Database
        const newTransaction = await transactionModel.create(transactionData)

        // Creating options to create razorpay Order
        const options = {
            amount: amount * 100,
            currency: process.env.CURRENCY,
            receipt: newTransaction._id,
        }

        // Creating razorpay Order
        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error);
                return res.json({ success: false, message: error });
            }
            res.json({ success: true, order });
        })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API Controller function to verify razorpay payment
const verifyRazorpay = async (req, res) => {
    try {

        const { razorpay_order_id } = req.body;

        // Fetching order data from razorpay
        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);

        // Checking for payment status
        if (orderInfo.status === 'paid') {
            const transactionData = await transactionModel.findById(orderInfo.receipt)
            if (transactionData.payment) {
                return res.json({ success: false, message: 'Payment Failed' })
            }

            // Adding Credits in user data
            const userData = await userModel.findById(transactionData.userId)
            const creditBalance = userData.creditBalance + transactionData.credits
            await userModel.findByIdAndUpdate(userData._id, { creditBalance })

            // Marking the payment true 
            await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

            res.json({ success: true, message: "Credits Added" });
        }
        else {
            res.json({ success: false, message: 'Payment Failed' });
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


const forgotPassword = async (req, res) => {
    const { email } = req.body;
  
    try {
      // Check if the email exists in the database
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(404).json({ success:false,error: 'Email not found' });
      }
  
      // Generate a temporary password (8 characters)
    const tempPassword = Math.random().toString(36).slice(-8);
  
      // Hash the temporary password using bcrypt
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    
    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();
  
      // Send the new password to the user's email using Nodemailer
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'globaltrek39@gmail.com', // your Gmail address
          pass: 'dzqu pzwu yryk nmsw', // your Gmail app password
        },
      });
  
      const mailOptions = {
        from: 'globaltrek39@gmail.com',
        to: email,
        subject: 'Password Reset - ImageGen',
        html: `
          <div style="
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            padding: 20px;
            border-radius: 10px;
            color: #333;
            text-align: center;
            max-width: 500px;
            margin: auto;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
          ">
            <h2 style="color: #007bff; font-size: 24px;">🚀 Password Reset - ImageGen</h2>
            <p style="font-size: 16px; margin-bottom: 20px;">
              Your new password is:
              <span style="
                display: inline-block;
                background-color: #e0e0e0;
                padding: 10px;
                border-radius: 5px;
                font-weight: bold;
                color: #333;
                margin-top: 10px;
              ">${tempPassword}</span>
            </p>
            <img src="https://media.giphy.com/media/3o7TKU8RvQuomFfUUU/giphy.gif" 
              alt="Thank you animation"
              style="width: 100%; max-width: 200px; border-radius: 10px; margin-top: 10px;"
            />
            <p style="
              font-size: 14px;
              color: #555;
              margin-top: 20px;
            ">
              Thank you for using <strong>ImageGen</strong>! If you didn’t request this, please ignore this email.
            </p>
            <a href="https://globaltrekc.onrender.com" 
              style="
                display: inline-block;
                background-color: #007bff;
                color: #fff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 10px;
                font-size: 14px;
                box-shadow: 0 4px 8px rgba(0,0,0,0.2);
              "
              target="_blank"
            >
              Go to ImageGen
            </a>
          </div>
        `,
      };
      
  
      await transporter.sendMail(mailOptions);
  
      res.json({ success:true,message: 'Password reset email sent successfully.' });
    } catch (error) {
      console.error('Error resetting password:', error);
      res.status(500).json({success:false, error: 'Internal server error' });
    }
  };


// Stripe Gateway Initialize
// const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY)

// // Payment API to add credits ( Stripe )
// const paymentStripe = async (req, res) => {
//     try {

//         const { userId, planId } = req.body
//         const { origin } = req.headers

//         const userData = await userModel.findById(userId)

//         // checking for planId and userdata
//         if (!userData || !planId) {
//             return res.json({ success: false, message: 'Invalid Credentials' })
//         }

//         let credits, plan, amount, date

//         // Switch Cases for different plans
//         switch (planId) {
//             case 'Basic':
//                 plan = 'Basic'
//                 credits = 100
//                 amount = 10
//                 break;

//             case 'Advanced':
//                 plan = 'Advanced'
//                 credits = 500
//                 amount = 50
//                 break;

//             case 'Business':
//                 plan = 'Business'
//                 credits = 5000
//                 amount = 250
//                 break;

//             default:
//                 return res.json({ success: false, message: 'plan not found' })
//         }

//         date = Date.now()

//         // Creating Transaction Data
//         const transactionData = {
//             userId,
//             plan,
//             amount,
//             credits,
//             date
//         }

//         // Saving Transaction Data to Database
//         const newTransaction = await transactionModel.create(transactionData)

//         const currency = process.env.CURRENCY.toLocaleLowerCase()

//         // Creating line items to for Stripe
//         const line_items = [{
//             price_data: {
//                 currency,
//                 product_data: {
//                     name: "Credit Purchase"
//                 },
//                 unit_amount: transactionData.amount * 100
//             },
//             quantity: 1
//         }]

//         const session = await stripeInstance.checkout.sessions.create({
//             success_url: `${origin}/verify?success=true&transactionId=${newTransaction._id}`,
//             cancel_url: `${origin}/verify?success=false&transactionId=${newTransaction._id}`,
//             line_items: line_items,
//             mode: 'payment',
//         })
        
//         res.json({ success: true, session_url: session.url });

//     } catch (error) {
//         console.log(error)
//         res.json({ success: false, message: error.message })
//     }
// }

// // API Controller function to verify stripe payment
// const verifyStripe = async (req, res) => {
//     try {

//         const { transactionId, success } = req.body

//         // Checking for payment status
//         if (success === 'true') {
//             const transactionData = await transactionModel.findById(transactionId)
//             if (transactionData.payment) {
//                 return res.json({ success: false, message: 'Payment Already Verified' })
//             }

//             // Adding Credits in user data
//             const userData = await userModel.findById(transactionData.userId)
//             const creditBalance = userData.creditBalance + transactionData.credits
//             await userModel.findByIdAndUpdate(userData._id, { creditBalance })

//             // Marking the payment true 
//             await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true })

//             res.json({ success: true, message: "Credits Added" });
//         }
//         else {
//             res.json({ success: false, message: 'Payment Failed' });
//         }

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }


export { registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay, forgotPassword }