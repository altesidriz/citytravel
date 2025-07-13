import { useContext, useEffect, useRef, useState } from 'react';
import styles from './navbar.module.css';
import logo from '/Travelocity-Symbol.png'

import { RxHamburgerMenu } from "react-icons/rx";
import { IoCloseSharp } from "react-icons/io5";

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
  const [responsive, setResponsive] = useState(false);
  const { user, dispatch } = useContext(AuthContext); // Use dispatch, not logout
  const navigate = useNavigate();
  const userMenuRef = useRef(null);
  const shopTravelRef = useRef(null);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' }); // Dispatch the LOGOUT action
    navigate('/');
  };

  useEffect(() => {
    const handleClickOutsideShopTravel = (event) => {
      if (shopTravelRef.current && !shopTravelRef.current.contains(event.target) && open) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutsideShopTravel);

    return () => {
      document.removeEventListener('mousedown', handleClickOutsideShopTravel);
    };
  }, [open]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target) && openUserMenu) {
        setOpenUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openUserMenu]);

  return (
    <div className={styles.container}>
      <div className={styles.left} ref={shopTravelRef}>
        <div className={styles.logo}>
          <Link to='/' onClick={()=>setResponsive(false)}>
            <img src={logo} alt="" />
          </Link>
        </div>
        <span onClick={() => (setOpen(!open))}>Shop Travel <IoIosArrowDown /></span>
        {open && <div className={styles.dropdown}>
          <a href='#' onClick={() => setOpen(false)}><BsBuildingsFill /> Stays</a>
          <a href='#' onClick={() => setOpen(false)}><BiSolidPlaneAlt /> Flights</a>
          <a href='#' onClick={() => setOpen(false)}><FaCarAlt /> Cars</a>
          <a href='#' onClick={() => setOpen(false)}><GiRollingSuitcase /> Packages</a>
          <a href='#' onClick={() => setOpen(false)}><FaTicketAlt /> Things to do</a>
          <a href='#' onClick={() => setOpen(false)}> <RiShipLine />Cruises</a>
        </div>}
      </div>
      <div className={styles.right}>
        <a to='#'><MdFileDownload /> Get the app</a>
        <a to='#'>Support</a>
        <a to='#'>Trips</a>
        {user ? (
          <div className={styles.userMenu} ref={userMenuRef}>
            <span className={styles.username} onClick={() => setOpenUserMenu(!openUserMenu)}>
              {user.username} <IoIosArrowDown />
            </span>
            {openUserMenu && (
              <div className={styles.userDropdown}>
                <Link to="/bookings" onClick={() => setOpenUserMenu(false)}>My Bookings</Link>
                <Link to="/properties" onClick={() => setOpenUserMenu(false)}>My Properties</Link>
                <Link to="/upload" onClick={() => setOpenUserMenu(false)}>List Your Property</Link>
                <span onClick={() => { handleLogout(); setOpenUserMenu(false); }}>Logout</span>
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
      <div className={styles.responsive}>
        {!responsive ? <RxHamburgerMenu size={40} onClick={() => { setResponsive(!responsive) }} /> :
          <IoCloseSharp size={40} onClick={() => { setResponsive(!responsive) }} />}

        {responsive ? <div className={styles.resMenu}>
          <a to='#' onClick={() => setResponsive(false)}><MdFileDownload /> Get the app</a>
          <a to='#' onClick={() => setResponsive(false)}>Support</a>
          <a to='#' onClick={() => setResponsive(false)}>Trips</a>
          {user ? (
            <div className={styles.userMenu} ref={userMenuRef}>
              <span className={styles.username} onClick={() => setOpenUserMenu(!openUserMenu)}>
                {user.username} <IoIosArrowDown />
              </span>
              {openUserMenu && (
                <div className={styles.userDropdown}>
                  <Link to="/bookings" onClick={() => {setOpenUserMenu(false) ; setResponsive(false)}}>My Bookings</Link>
                  <Link to="/properties" onClick={() => {setOpenUserMenu(false) ; setResponsive(false)}}>My Properties</Link>
                  <Link to="/upload" onClick={() => {setOpenUserMenu(false) ; setResponsive(false)}}>List Your Property</Link>
                  <span onClick={() => { handleLogout(); setOpenUserMenu(false); setResponsive(false) }}>Logout</span>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to={'/signup'} onClick={() => setResponsive(false)}>Sign up</Link>
              <Link to={'/login'} onClick={() => setResponsive(false)}>Login</Link>
            </>
          )}
        </div> : ""}
      </div>
    </div>
  )
}

export default Navbar