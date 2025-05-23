import Hotel from "../models/Hotel.js";
import { verifyToken } from "../utils/verifyToken.js";

export const createHotel = async (req, res, next) => {
    verifyToken(req, res, async () => {
      try {
        const {
          listedBy,
          name,
          type,
          city,
          address,
          description,
          rating,
          price,
          amenities,
          featured,
          images,
          title,
        } = req.body;
  
        
        const parsedRating = rating === '' ? undefined : Number(rating);
        const parsedPrice = price === '' ? undefined : Number(price);
  
        
        if (!listedBy || !name || !type || !city || !address || !title || !parsedPrice) {
          return res.status(400).json({ message: 'Missing required fields' });
        }
  
        const newHotel = new Hotel({
          listedBy,
          name,
          type,
          city,
          address,
          description,
          rating: parsedRating,
          price: parsedPrice,
          amenities,
          featured,
          images,
          title,
        });
  
        const savedHotel = await newHotel.save();
  
        res.status(201).json({
          message: 'Hotel created successfully',
          data: savedHotel,
        });
      } catch (err) {
        if (err.name === 'ValidationError') {
          return res.status(400).json({ message: err.message });
        } else if (err.code === 11000) {
          return res.status(409).json({ message: 'Hotel already exists' });
        }
        next(err);
      }
    });
  };

//update
export const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err)
    }
};

//delete
export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err)
    }
};

//getAHotel
export const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err)
    }
};

// export const getAllHotels = async (req, res, next) => {
//     try {
//         const allHotels = await Hotel.find();
//         res.status(200).json(allHotels);
//     } catch (err) {
//         next(err)
//     }
// };

export const getAllHotelsByLocation = async (req, res, next) => {
    try {
        const city = req.query.city;

        if (!city) {
            return res.status(400).json({ message: 'City is required' });
        }

        const hotels = await Hotel.find({
            city: { $regex: new RegExp(city, 'i') },
        });

        res.json(hotels);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//Filter By Amenities
export const filterHotelsByAmenities = async (req, res, next) => {
    try {
        const { city, amenities } = req.query;

        console.log("City:", city);
        console.log("Amenities:", amenities);

        if (!city) {
            return res.status(400).json({ message: 'City is required' });
        }

        if (!amenities) {
            return res.status(400).json({ message: 'Amenities are required' });
        }

        const amenitiesArray = amenities.split(',');
        const query = {
            city: { $regex: new RegExp(city, 'i') },
            amenities: { $all: amenitiesArray },
        };


        const hotels = await Hotel.find(query);

        if (hotels.length === 0) {
            // No hotels found
            return res.json({ message: "No hotels found" }); // Or res.json({ message: "No hotels found" });
        }

        res.json(hotels);
    } catch (err) {
        console.error("Error in filterHotelsByAmenities:", err);
        res.status(500).json({ message: err.message });
    }
};

//get allHotels
export const getAllHotelsByPrice = async (req, res, next) => {

    const { min, max, ...others } = req.query;

    try {
        const allHotels = await Hotel.find({ ...others, cheapestPrice: { $gt: min || 1, $lt: max || 9999 } }).limit(3);
        res.status(200).json(allHotels);
    } catch (err) {
        next(err)
    }
};

export const countByCity = async (req, res, next) => {
    const cities = req.query.cities.split(',');

    try {
        const list = await Promise.all(cities.map(city => {
            return Hotel.countDocuments({ city: city });
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err)
    }
};

export const countByType = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" });
        const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
        const resortCount = await Hotel.countDocuments({ type: "resort" });
        const villaCount = await Hotel.countDocuments({ type: "villa" });
        const cabinCount = await Hotel.countDocuments({ type: "cabin" });

        res.status(200).json([
            { type: "hotel", count: hotelCount },
            { type: "apartment", count: apartmentCount },
            { type: "resort", count: resortCount },
            { type: "villa", count: villaCount },
            { type: "cabin", count: cabinCount }
        ])
    } catch (err) {
        next(err)
    }
};

export const getHotelsByUser = async (req, res, next) => {
  try {
    const userId = req.params.userId;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const hotels = await Hotel.find({ listedBy: userId });
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
