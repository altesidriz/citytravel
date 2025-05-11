import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import HotelsList from './pages/hotelsList/HotelsList';
import { SearchContextProvider } from './context/SearchContext';
import Hotel from './pages/hotel/Hotel';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import { AuthContextProvider } from './context/AuthContext';
import UploadProperty from './pages/upload/UploadProperty';
import NotFound from './pages/notFound/NotFound';
import Room from './pages/room/Room.';
import Bookings from './pages/bookings/Bookings';
import MyProperties from './pages/properties/MyProperties';

const App = () => {
  return (
    <div>
      <AuthContextProvider>
        <SearchContextProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/hotels' element={<HotelsList />} />
              <Route path='/hotels/:id' element={<Hotel />} />
              <Route path='/bookings' element={<Bookings />} />
              <Route path='/properties' element={<MyProperties />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path="/upload" element={<UploadProperty />} />
              <Route path="/room/:roomId" element={<Room />} />
              <Route path="/*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </SearchContextProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App