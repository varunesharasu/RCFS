"use client"

import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import "./AdminDashboard.css"

// Icons as SVG components for better performance
const SearchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="search-icon"
  >
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
)

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
)

const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
)

const RoomIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>
)

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const navigate = useNavigate()

  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 },
    },
  }

  const tableVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: 0.3 },
    },
  }

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("adminToken")
        if (!token) {
          navigate("/admin/login")
          return
        }

        const response = await axios.get("http://localhost:5000/api/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        })

        setBookings(response.data.bookings || [])
      } catch (err) {
        setError("Failed to fetch bookings. Please try again.")
        console.error("Error fetching bookings:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchBookings()
  }, [navigate])

  // Filter bookings based on search query and status filter
  // const filteredBookings = bookings.filter((booking) => {
  //   const matchesSearch =
  //     String(booking.bookingId).toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     String(booking.roomId).toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     booking.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     booking.user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     String(booking.status).toLowerCase().includes(searchQuery.toLowerCase())

  //   const matchesStatus = statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase()

  //   return matchesSearch && matchesStatus
  // })

  //Filter booking by room number
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch = searchQuery
      ? String(booking.roomId) === searchQuery
      : true; // Only filter by room number
  
    const matchesStatus =
      statusFilter === "all" || booking.status.toLowerCase() === statusFilter.toLowerCase();
  
    return matchesSearch && matchesStatus;
  });

  // Calculate some stats for the dashboard
  const totalBookings = bookings.length
  const activeBookings = bookings.filter((b) => b.status.toLowerCase() === "active").length
  const canceledBookings = bookings.filter((b) => b.status.toLowerCase() === "canceled").length
  const totalRevenue = bookings.reduce((sum, booking) => sum + booking.totalAmount, 0)

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Get status badge class
  const getStatusBadgeClass = (status) => {
    const statusLower = status.toLowerCase()
    if (statusLower === "active") return "status-badge status-active"
    if (statusLower === "canceled") return "status-badge status-canceled"
    return "status-badge status-pending"
  }

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">
          <div className="loading-spinner"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-dashboard">
        <div className="error">{error}</div>
      </div>
    )
  }

  return (
    <motion.div className="admin-dashboard" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="dashboard-header" variants={itemVariants}>
        <h2>Booking Management</h2>
      </motion.div>

      {/* Stats Cards */}
      <motion.div className="dashboard-stats" variants={itemVariants}>
        <motion.div className="stat-card" whileHover={{ y: -5 }}>
          <h3>Total Bookings</h3>
          <p>{totalBookings}</p>
        </motion.div>

        <motion.div className="stat-card" whileHover={{ y: -5 }}>
          <h3>Active Bookings</h3>
          <p>{activeBookings}</p>
        </motion.div>

        <motion.div className="stat-card" whileHover={{ y: -5 }}>
          <h3>Canceled Bookings</h3>
          <p>{canceledBookings}</p>
        </motion.div>

        <motion.div className="stat-card" whileHover={{ y: -5 }}>
          <h3>Total Revenue</h3>
          <p>{formatCurrency(totalRevenue)}</p>
        </motion.div>
      </motion.div>

      {/* Controls */}
      <motion.div className="controls" variants={itemVariants}>
        <div className="search-bar">
          <SearchIcon />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="status-filter">
          <button
            className={`filter-button ${statusFilter === "all" ? "active" : ""}`}
            onClick={() => setStatusFilter("all")}
          >
            All
          </button>
          <button
            className={`filter-button ${statusFilter === "active" ? "active" : ""}`}
            onClick={() => setStatusFilter("active")}
          >
            Active
          </button>
          <button
            className={`filter-button ${statusFilter === "canceled" ? "active" : ""}`}
            onClick={() => setStatusFilter("canceled")}
          >
            Canceled
          </button>
        </div>
      </motion.div>

      {/* Bookings Table */}
      {filteredBookings.length > 0 ? (
        <motion.div className="table-container" variants={tableVariants}>
          <table>
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Room</th>
                <th>Dates</th>
                <th>Guests</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking, index) => (
                <motion.tr
                  key={booking.bookingId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ backgroundColor: "#f1f5f9" }}
                >
                  <td>#{booking.bookingId}</td>
                  <td>Room #{booking.roomId}</td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <CalendarIcon />
                      <div>
                        {new Date(booking.startDate).toLocaleDateString()} -
                        <br />
                        {new Date(booking.endDate).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td>
                    {booking.adults} Adults
                    {booking.children > 0 && `, ${booking.children} Children`}
                  </td>
                  <td>{formatCurrency(booking.totalAmount)}</td>
                  <td>
                    <span className={getStatusBadgeClass(booking.status)}>{booking.status}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <UserIcon />
                      <div>
                        <div style={{ fontWeight: 500 }}>{booking.user.username}</div>
                        <div style={{ fontSize: "0.75rem", color: "#64748b" }}>{booking.user.email}</div>
                      </div>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      ) : (
        <motion.div className="empty-state" variants={itemVariants}>
          <RoomIcon />
          <p>No bookings found matching your criteria.</p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default AdminDashboard

