// routes/bookings.js
import express from 'express';
import { createBooking } from '../controllers/bookingController.js';
import { verifyToken } from '../utils/verifyToken.js';

const router = express.Router();

// POST /api/bookings
// Route to create a new booking (requires user authentication)
router.post('/', verifyToken, createBooking);

export default router;