import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import Navbar from "./components/navbar/Navbar"
import Home from "./pages/home/Home"
import HotelsList from './pages/hotelsList/HotelsList';
import { SearchContextProvider } from './context/SearchContext';

const App = () => {
  return (
    <div>
      <SearchContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/hotels' element={<HotelsList />} />
          </Routes>
        </BrowserRouter>
      </SearchContextProvider>
    </div>
  )
}

export default App