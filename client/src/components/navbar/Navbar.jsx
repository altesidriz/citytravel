import React, { useState } from 'react';
import styles from './navbar.module.css';

import { IoIosArrowDown } from "react-icons/io";
import { MdFileDownload } from "react-icons/md";
import { BsBuildingsFill } from "react-icons/bs";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaCarAlt } from "react-icons/fa";
import { GiRollingSuitcase } from "react-icons/gi";
import { FaTicketAlt } from "react-icons/fa";
import { RiShipLine } from "react-icons/ri";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.logo}>
          <img src="./Travelocity-Symbol.png" alt="" />
        </div>
        <span onClick={()=>(setOpen(!open))}>Shop Travel <IoIosArrowDown /></span>
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
        <a to='#'>List your property</a>
        <a to='#'>Support</a>
        <a to='#'>Trips</a>
        <a to='#'>Sign in</a>
      </div>
    </div>
  )
}

export default Navbar