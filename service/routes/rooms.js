import express from 'express';
import { createRoom, deleteRoom, getAllRooms, getRoomsByHotel, updateRoom } from '../controllers/roomController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//Create
router.post('/:hotelId', verifyAdmin, createRoom);
//Update
router.put('/:id', verifyAdmin, updateRoom);
//Delete
router.delete('/:id/:hotelId',verifyAdmin, deleteRoom);
//Get a hotel
router.get('/:hotelId', getRoomsByHotel);
//Get All
router.get('/', getAllRooms);

export default router;