import mongoose from 'mongoose';

const RoomSchema = new mongoose.Schema({
    hotelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Hotel', // References the Hotel model
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["single", "double", "triple", "apartment"]
    },
    price: {
        type: Number,
        required: true
    },
    amenities: {
        type: [String],
        default: []
    },
    available: {
        type: Boolean,
        default: true
    },
    images: {
        type: [String],
        default: []
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

export default mongoose.model("Room", RoomSchema)