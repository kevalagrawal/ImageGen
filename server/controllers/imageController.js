// 

import axios from 'axios';
import FormData from 'form-data';
import userModel from '../models/userModel.js';

// List of API keys to switch between
const API_KEYS = [
  process.env.CLIPDROP_API_1,
  process.env.CLIPDROP_API_2,
  process.env.CLIPDROP_API_3
];

async function callClipdropAPI(prompt) {
  let lastError = null;

  for (const apiKey of API_KEYS) {
    try {
      const formdata = new FormData();
      formdata.append('prompt', prompt);

      const { data } = await axios.post('https://clipdrop-api.co/text-to-image/v1', formdata, {
        headers: { 'x-api-key': apiKey },
        responseType: 'arraybuffer'
      });

      // Convert arrayBuffer to base64
      return `data:image/png;base64,${Buffer.from(data, 'binary').toString('base64')}`;
      
    } catch (error) {
      lastError = error;
      console.log(`API key failed: ${apiKey}, trying next...`);
    }
  }

  // If all API keys fail, throw the last encountered error
  throw lastError;
}

// Controller function to generate image from prompt
export const generateImage = async (req, res) => {
  try {
    const { userId, prompt } = req.body;

    // Fetch User Details
    const user = await userModel.findById(userId);
    if (!user || !prompt) {
      return res.json({ success: false, message: 'Missing Details' });
    }

    // Check user credit balance
    if (user.creditBalance <= 0) {
      return res.json({ success: false, message: 'No Credit Balance', creditBalance: user.creditBalance });
    }

    // Attempt to generate image using available API keys
    const resultImage = await callClipdropAPI(prompt);

    // Deduct 1 credit from user
    await userModel.findByIdAndUpdate(user._id, { creditBalance: user.creditBalance - 1 });

    // Send Response
    res.json({
      success: true,
      message: 'Image Generated Successfully',
      resultImage,
      creditBalance: user.creditBalance - 1
    });

  } catch (error) {
    console.log(error.message);
    res.json({ success: false, message: error.message });
  }
};
