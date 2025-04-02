import mongoose from 'mongoose';

const HotelSchema = new mongoose.Schema({
    listedBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    },
    type:{
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    price: {
        type: Number,
        required: true // Base price
    },
    amenities: {
        type: [String],
        default: []
    },
    featured: {
        type: Boolean,
        default: false
    },
    images: {
        type: [String],
        default: []
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        trim: true
    }
}, { timestamps: true });

export default mongoose.model("Hotel", HotelSchema)