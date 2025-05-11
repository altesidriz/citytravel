// controllers/bookingController.js
import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { createError } from '../utils/error.js';

export const createBooking = async (req, res, next) => {
  try {
    const userId = req.user.id; // Get user ID from the verified token
    const { roomId, checkIn, checkOut, numberOfGuests, totalPrice } = req.body;

    // Basic data validation
    if (!roomId || !checkIn || !checkOut || !numberOfGuests || totalPrice === undefined) {
      return next(createError(400, 'Missing required booking information.'));
    }

    // Check if the room exists
    const room = await Room.findById(roomId);
    if (!room) {
      return next(createError(404, 'Room not found.'));
    }

    // Create a new booking
    const newBooking = new Booking({
      userId: userId,
      roomId: roomId,
      hotelId: room.hotelId, // Assuming your Room model has a hotelId
      checkIn: checkIn,
      checkOut: checkOut,
      numberOfGuests: numberOfGuests,
      totalPrice: totalPrice,
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({ message: 'Booking created successfully!', booking: savedBooking });

  } catch (err) {
    next(err);
  }
};