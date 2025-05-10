import { useContext, useState } from 'react';
import styles from './navbar.module.css';
import logo from '/Travelocity-Symbol.png'

import { IoIosArrowDown } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { BsBuildingsFill } from "react-icons/bs";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaCarAlt } from "react-icons/fa";
import { GiRollingSuitcase } from "react-icons/gi";
import { FaTicketAlt } from "react-icons/fa";
import { RiShipLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const { user, dispatch } = useContext(AuthContext); // Use dispatch, not logout
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' }); // Dispatch the LOGOUT action
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <Link to='/'>
          <img src={logo} alt="" />
          </Link>
        </div>
        <span onClick={() => (setOpen(!open))}>Shop Travel <IoIosArrowDown /></span>
        {open && <div className={styles.dropdown}>
          <a href='#'><BsBuildingsFill /> Stays</a>
          <a href='#'><BiSolidPlaneAlt /> Flights</a>
          <a href='#'><FaCarAlt /> Cars</a>
          <a href='#'><GiRollingSuitcase /> Packages</a>
          <a href='#'><FaTicketAlt /> Things to do</a>
          <a href='#'> <RiShipLine />Cruises</a>
        </div>}
      </div>
      <div className={styles.right}>
        <a to='#'><MdFileDownload /> Get the app</a>
        <a to='#'>Support</a>
        <a to='#'>Trips</a>
        {user ? (
  <div className={styles.userMenu}>
    <span className={styles.username} onClick={() => setOpenUserMenu(!openUserMenu)}>
      {user.username} <IoIosArrowDown />
    </span>
    {openUserMenu && (
      <div className={styles.userDropdown}>
        <Link to="/bookings">My Bookings</Link>
        <Link to="/properties">My Properties</Link>
        <span onClick={handleLogout}>Logout</span>
      </div>
    )}
  </div>
) : (
  <>
    <Link to={'/signup'}>Sign up</Link>
    <Link to={'/login'}>Login</Link>
  </>
)}
      </div>
    </div>
  )
}

export default Navbar