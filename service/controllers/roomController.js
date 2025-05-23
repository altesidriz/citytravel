import Room from '../models/Room.js';
import Hotel from '../models/Hotel.js';
import { createError } from '../utils/error.js'

//create a room
export const createRoom = async (req, res, next) => {

    const hotelId = req.params.hotelId;

    const newRoom = new Room({
        ...req.body,
        hotelId
    });

    try {
        const savedRoom = await newRoom.save();
        res.status(200).json(savedRoom);
    } catch (err) {
        next(err)
    }
};

export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(err)
    }
};

//delete
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelid;

    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (err) {
            next(err)
        };
        res.status(200).json("Room has been deleted");
    } catch (err) {
        next(err)
    }
};

//getARoom
export const getRoomsByHotel = async (req, res, next) => {
    try {
        const room = await Room.find({ hotelId: req.params.hotelId });
        res.status(200).json(room);
    } catch (err) {
        next(err)
    }
};

//get Single Room
export const getRoom = async (req, res, next) => {
    try {
        console.log(req.params.roomId);
        const room = await Room.findById(req.params.roomId); // Assuming your route parameter is 'roomId'
        if (!room) {
            return res.status(404).json({ message: "Room not found" });
        }
        res.status(200).json(room);
    } catch (err) {
        next(err);
    }
};