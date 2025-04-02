import React, { createContext, useState, useCallback } from 'react';
import moment from 'moment';

export const SearchContext = createContext({
  location: '',
  setLocation: () => {},
  selectedDates: [],
  setSelectedDates: () => {},
  travelers: {
    adults: 2,
    children: 0,
    rooms: 1,
    childrenAges: [],
  },
  setTravelers: () => {},
  hotels: [],
  setHotels: () => {},
  originalHotels: [], // Add originalHotels state
  setOriginalHotels: () => {}, // Add setOriginalHotels state
  loading: false,
  setLoading: () => {},
  error: null,
  setError: () => {},
  fetchHotelsByLocation: async (location) => {},
});

export const SearchContextProvider = ({ children }) => {
  const [location, setLocation] = useState('');
  const [selectedDates, setSelectedDates] = useState([]);
  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 0,
    rooms: 1,
    childrenAges: [],
  });
  const [hotels, setHotels] = useState([]);
  const [originalHotels, setOriginalHotels] = useState([]); // Initialize originalHotels
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotelsByLocation = useCallback(async (location) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/hotels?city=${location}`);
      if (!response.ok) {
        throw new Error('Failed to fetch hotels');
      }
      const data = await response.json();
      setHotels(data);
      setOriginalHotels(data); // Store the original hotels
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const contextValues = {
    location,
    setLocation,
    selectedDates,
    setSelectedDates,
    travelers,
    setTravelers,
    hotels,
    setHotels,
    originalHotels, // Add originalHotels to context values
    setOriginalHotels, // Add setOriginalHotels to context values
    loading,
    setLoading,
    error,
    setError,
    fetchHotelsByLocation,
  };

  return (
    <SearchContext.Provider value={contextValues}>{children}</SearchContext.Provider>
  );
};