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
              <Route path='/login' element={<Login />} />
              <Route path='/signup' element={<Signup />} />
              <Route path="/upload" element={<UploadProperty />} />
            </Routes>
          </BrowserRouter>
        </SearchContextProvider>
      </AuthContextProvider>
    </div>
  )
}

export default App