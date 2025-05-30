import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from 'cors';

//routes import
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import bookingsRoute from "./routes/bookings.js";
import imageKitAuth from "./routes/imageKitAuth.js";

const app = express();
dotenv.config();

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGOBOOK);
        console.log('MongoDB conection is live!');
    } catch (error) {
        throw error
    }
}

mongoose.connection.on("disconnected", ()=>{
    console.log("MongoDB connection lost!");
})

mongoose.connection.on("connected", ()=>{
    console.log("MongoDB connection running!");
})

//middlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use('/api', imageKitAuth);
app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);
app.use('/api/bookings', bookingsRoute);

app.use((err, req, res, next)=> {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    })
});


app.listen(8800, () => {
    connect();
    console.log('Connected to backend.');
});

