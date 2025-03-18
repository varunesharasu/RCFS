// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import "./AdminNavbar.css";

// const AdminNavbar = () => {
//   return (
//     <motion.nav
//       className="admin-navbar"
//       initial={{ y: -50, opacity: 0 }}
//       animate={{ y: 0, opacity: 1 }}
//       transition={{ duration: 0.8 }}
//     >
//       {/* Home Link */}
//       <motion.div whileHover={{ scale: 1.1 }}>
//         <Link to="/admin/home">Home</Link>
//       </motion.div>

//       {/* Dashboard Link */}
//       <motion.div whileHover={{ scale: 1.1 }}>
//         <Link to="/admin/dashboard">Booking</Link>
//       </motion.div>

//       {/* Rooms Link */}
//       <motion.div whileHover={{ scale: 1.1 }}>
//         <Link to="/admin/rooms">Rooms</Link>
//       </motion.div>

//       {/* Logout Button */}
//       <motion.button
//         whileHover={{ scale: 1.1, backgroundColor: "#ff4d4d" }}
//         whileTap={{ scale: 0.9 }}
//         onClick={() => {
//           localStorage.removeItem("adminToken");
//           window.location.href = "/admin/login";
//         }}
//       >
//         Logout
//       </motion.button>
//     </motion.nav>
//   );
// };

// export default AdminNavbar;


"use client"

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Home, Calendar, DoorClosed, LogOut, LayoutDashboard } from 'lucide-react';
import "./AdminNavbar.css";

const AdminNavbar = () => {
  const [activeLink, setActiveLink] = useState("");
  
  // Set active link based on current path
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("/admin/home")) setActiveLink("home");
    else if (path.includes("/admin/dashboard")) setActiveLink("booking");
    else if (path.includes("/admin/rooms")) setActiveLink("rooms");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  return (
    <motion.nav
      className="admin-navbar"
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <div className="navbar-logo">
        <LayoutDashboard />
        <span>Admin Portal</span>
      </div>
      
      <div className="nav-links">
        <motion.div 
          className="nav-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Link 
            to="/admin/home" 
            className={`nav-link ${activeLink === "home" ? "active" : ""}`}
            onClick={() => setActiveLink("home")}
          >
            <Home />
            <span>Home</span>
            {activeLink === "home" && (
              <motion.div 
                className="active-indicator"
                layoutId="activeIndicator"
              />
            )}
          </Link>
        </motion.div>

        <motion.div 
          className="nav-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            to="/admin/dashboard" 
            className={`nav-link ${activeLink === "booking" ? "active" : ""}`}
            onClick={() => setActiveLink("booking")}
          >
            <Calendar />
            <span>Booking</span>
            {activeLink === "booking" && (
              <motion.div 
                className="active-indicator"
                layoutId="activeIndicator"
              />
            )}
          </Link>
        </motion.div>

        <motion.div 
          className="nav-item"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <Link 
            to="/admin/rooms" 
            className={`nav-link ${activeLink === "rooms" ? "active" : ""}`}
            onClick={() => setActiveLink("rooms")}
          >
            <DoorClosed />
            <span>Rooms</span>
            {activeLink === "rooms" && (
              <motion.div 
                className="active-indicator"
                layoutId="activeIndicator"
              />
            )}
          </Link>
        </motion.div>
      </div>

      <motion.button
        className="logout-button"
        onClick={handleLogout}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        whileHover={{ 
          scale: 1.05,
          backgroundColor: "rgba(239, 68, 68, 0.1)" 
        }}
        whileTap={{ scale: 0.95 }}
      >
        <LogOut />
        <span>Logout</span>
      </motion.button>
    </motion.nav>
  );
};

export default AdminNavbar;
