import express from 'express';
import {
    countByCity,
    countByType,
    createHotel,
    deleteHotel,
    filterHotelsByAmenities,
    // getAllHotels,
    getAllHotelsByLocation,
    getAllHotelsByPrice,
    getHotel,
    updateHotel
} from '../controllers/hotelController.js';
import { verifyAdmin } from '../utils/verifyToken.js';

const router = express.Router();

//Create
router.post('/', verifyAdmin, createHotel);
//Update
router.put('/:id', verifyAdmin, updateHotel);
//Delete
router.delete('/:id', verifyAdmin, deleteHotel);
//Get a hotel
router.get('/find/:id', getHotel);
//Get All
// router.get('/', getAllHotels);

router.get('/', getAllHotelsByLocation);

router.get('/amenities', filterHotelsByAmenities);

router.get('/price', getAllHotelsByPrice);

router.get('/countByCity', countByCity);

router.get('/countByType', countByType);

export default router;