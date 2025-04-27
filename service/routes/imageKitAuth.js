// routes/imageKitAuth.js
import express from 'express';
import ImageKit from 'imagekit';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

router.get('/imagekitAuth', (req, res) => {
  try {
    const authenticationParameters = imagekit.getAuthenticationParameters();
    res.status(200).json(authenticationParameters);
    console.log(authenticationParameters);
  } catch (error) {
    console.error('Error generating ImageKit authentication token:', error);
    res.status(500).json({ message: 'Failed to generate authentication token' });
  }
});

export default router;