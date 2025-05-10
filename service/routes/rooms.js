import express from 'express';
import { createRoom, deleteRoom, getRoom, getRoomsByHotel, updateRoom } from '../controllers/roomController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//Create
router.post('/:hotelId', verifyAdmin, createRoom);
//Update
router.put('/:id', verifyAdmin, updateRoom);
//Delete
router.delete('/:id/:hotelId',verifyAdmin, deleteRoom);
//Get a hotel
router.get('/hotel/:hotelId', getRoomsByHotel);
//Get A Room
router.get('/:roomId', getRoom)


export default router;