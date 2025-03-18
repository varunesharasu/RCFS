// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import './UserDashboard.css';

// const UserDashboard = () => {
//   const navigate = useNavigate();
//   const [userData, setUserData] = useState(null);
//   const [bookings, setBookings] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [updatedUsername, setUpdatedUsername] = useState('');
//   const [updatedEmail, setUpdatedEmail] = useState('');

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         if (!token) {
//           navigate('/login');
//           return;
//         }

//         const response = await axios.get('http://localhost:5000/api/user', {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         // Filter ACTIVE bookings
//         const activeBookings = response.data.bookings.filter(b => b.status === 'active');
//         setUserData(response.data.user);
//         setBookings(activeBookings);
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//         navigate('/login');
//       }
//     };

//     fetchUserData();
//   }, [navigate]);

//   const handleCancelBooking = async (bookingId) => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Refetch data to update UI
//       const response = await axios.get('http://localhost:5000/api/user', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUserData(response.data.user);
//       setBookings(response.data.bookings.filter(b => b.status === 'active'));
//       alert('Booking canceled successfully');
//     } catch (error) {
//       console.error('Error canceling booking:', error);
//       alert('Failed to cancel booking');
//     }
//   };

//   const handleUpdateUserDetails = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       await axios.put(
//         'http://localhost:5000/api/user/update',
//         {
//           username: updatedUsername || userData.username,
//           email: updatedEmail || userData.email,
//         },
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       // Refetch updated user data
//       const response = await axios.get('http://localhost:5000/api/user', {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setUserData(response.data.user);
//       setIsEditing(false);
//       alert('User details updated successfully');
//     } catch (error) {
//       console.error('Error updating user details:', error);
//       alert('Failed to update user details');
//     }
//   };

//   if (!userData) return <p className="loading-text">Loading...</p>;

//   return (
//     <div className="dashboard-container">
//       <h2 className="dashboard-title">User Dashboard</h2>

//       {/* User Details Section */}
//       <div className="user-card">
//         <h3>User Details</h3>
//         <p><strong>Username:</strong> {userData.username}</p>
//         <p><strong>Email:</strong> {userData.email}</p>
//         <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit Details</button>
//       </div>

//       {/* Bookings Section */}
//       <h3 className="section-title">Your Active Bookings</h3>
//       {bookings.length === 0 ? (
//         <p className="no-bookings">No active bookings found.</p>
//       ) : (
//         <table className="bookings-table">
//           <thead>
//             <tr>
//               <th>Room ID</th>
//               <th>Start Date</th>
//               <th>End Date</th>
//               <th>Adults</th>
//               <th>Children</th>
//               <th>Total Amount</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {bookings.map((booking) => (
//               <tr key={booking._id}>
//                 <td>{booking.roomId}</td>
//                 <td>{new Date(booking.startDate).toLocaleDateString()}</td>
//                 <td>{new Date(booking.endDate).toLocaleDateString()}</td>
//                 <td>{booking.adults}</td>
//                 <td>{booking.children}</td>
//                 <td>₹{booking.totalAmount}</td>
//                 <td>
//                   <button 
//                     className="cancel-btn" 
//                     onClick={() => handleCancelBooking(booking._id)}
//                   >
//                     Cancel
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}

//       {/* Edit Modal */}
//       {isEditing && (
//         <div className="modal-overlay" onClick={() => setIsEditing(false)}>
//           <div className="modal-content" onClick={(e) => e.stopPropagation()}>
//             <h3>Edit User Details</h3>
//             <input
//               type="text"
//               placeholder="Username"
//               value={updatedUsername}
//               onChange={(e) => setUpdatedUsername(e.target.value)}
//               className="modal-input"
//             />
//             <input
//               type="email"
//               placeholder="Email"
//               value={updatedEmail}
//               onChange={(e) => setUpdatedEmail(e.target.value)}
//               className="modal-input"
//             />
//             <button className="save-btn" onClick={handleUpdateUserDetails}>Save Changes</button>
//             <button className="close-btn" onClick={() => setIsEditing(false)}>Cancel</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UserDashboard;


import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUsername, setUpdatedUsername] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/user', {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Filter ACTIVE bookings
        const activeBookings = response.data.bookings.filter(b => b.status === 'active');
        setUserData(response.data.user);
        setBookings(activeBookings);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleCancelBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Refetch data to update UI
      const response = await axios.get('http://localhost:5000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data.user);
      setBookings(response.data.bookings.filter(b => b.status === 'active'));
      
      // Show success notification
      showNotification('Booking canceled successfully', 'success');
    } catch (error) {
      console.error('Error canceling booking:', error);
      showNotification('Failed to cancel booking', 'error');
    }
  };

  const handleUpdateUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/user/update',
        {
          username: updatedUsername || userData.username,
          email: updatedEmail || userData.email,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Refetch updated user data
      const response = await axios.get('http://localhost:5000/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserData(response.data.user);
      setIsEditing(false);
      showNotification('User details updated successfully', 'success');
    } catch (error) {
      console.error('Error updating user details:', error);
      showNotification('Failed to update user details', 'error');
    }
  };

  const showNotification = (message, type) => {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span>${message}</span>
        <button class="notification-close">×</button>
      </div>
    `;
    document.body.appendChild(notification);
    
    // Add the 'show' class after a small delay to trigger the animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 3000);

    // Close button functionality
    const closeButton = notification.querySelector('.notification-close');
    closeButton.addEventListener('click', () => {
      notification.classList.remove('show');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    });
  };

  const openEditModal = () => {
    setUpdatedUsername(userData.username);
    setUpdatedEmail(userData.email);
    setIsEditing(true);
  };

  // Skeleton loader component
  const Skeleton = ({ className }) => {
    return <div className={`skeleton ${className}`}></div>;
  };

  // Badge component
  const Badge = ({ children, variant }) => {
    return <span className={`badge ${variant}`}>{children}</span>;
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">User Dashboard</h1>
        <p className="dashboard-subtitle">Manage your account and bookings</p>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-section">
          {isLoading ? (
            <div className="card">
              <div className="card-header">
                <Skeleton className="h-8 w-1/3 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </div>
              <div className="card-content">
                <div className="space-y-4">
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-10 w-1/4 mx-auto" />
                </div>
              </div>
            </div>
          ) : (
            <div className="card user-profile-card">
              <div className="card-header">
                <h2 className="card-title">User Profile</h2>
                <p className="card-description">Your personal information</p>
              </div>
              <div className="card-content">
                <div className="user-info">
                  <div className="user-info-item">
                    <svg className="user-info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                    <div>
                      <span className="user-info-label">Username</span>
                      <span className="user-info-value">{userData?.username}</span>
                    </div>
                  </div>
                  <div className="user-info-item">
                    <svg className="user-info-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                    </svg>
                    <div>
                      <span className="user-info-label">Email</span>
                      <span className="user-info-value">{userData?.email}</span>
                    </div>
                  </div>
                </div>
                <button 
                  className="button primary-button edit-profile-btn" 
                  onClick={openEditModal}
                >
                  Edit Profile
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="dashboard-section">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Your Active Bookings</h2>
              <p className="card-description">Manage your current reservations</p>
            </div>
            <div className="card-content">
              {isLoading ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-12 w-full" />
                </div>
              ) : bookings.length === 0 ? (
                <div className="no-bookings">
                  <div className="no-bookings-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12">
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                      <line x1="16" x2="16" y1="2" y2="6"></line>
                      <line x1="8" x2="8" y1="2" y2="6"></line>
                      <line x1="3" x2="21" y1="10" y2="10"></line>
                    </svg>
                  </div>
                  <p>You don't have any active bookings</p>
                  <button className="button outline-button mt-4">
                    Book a Room
                  </button>
                </div>
              ) : (
                <div className="bookings-table-container">
                  <table className="bookings-table">
                    <thead>
                      <tr>
                        <th>Room</th>
                        <th>Dates</th>
                        <th>Guests</th>
                        <th>Amount</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bookings.map((booking, index) => (
                        <tr key={booking._id} className="booking-row" style={{ animationDelay: `${index * 0.1}s` }}>
                          <td>
                            <div className="room-info">
                              <Badge variant="outline">Room {booking.roomId}</Badge>
                            </div>
                          </td>
                          <td>
                            <div className="booking-dates">
                              <div className="date-item">
                                <svg className="date-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>{new Date(booking.startDate).toLocaleDateString()}</span>
                              </div>
                              <span className="date-separator">→</span>
                              <div className="date-item">
                                <svg className="date-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <circle cx="12" cy="12" r="10"></circle>
                                  <polyline points="12 6 12 12 16 14"></polyline>
                                </svg>
                                <span>{new Date(booking.endDate).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className="guests-info">
                              <div className="guests-item">
                                <svg className="guests-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                  <circle cx="9" cy="7" r="4"></circle>
                                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                </svg>
                                <span>{booking.adults} Adults</span>
                              </div>
                              {booking.children > 0 && (
                                <div className="guests-item">
                                  <svg className="guests-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                    <circle cx="9" cy="7" r="4"></circle>
                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                                  </svg>
                                  <span>{booking.children} Children</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td>
                            <div className="amount">
                              <span className="amount-value">₹{booking.totalAmount}</span>
                            </div>
                          </td>
                          <td>
                            <button 
                              className="button destructive-button cancel-booking-btn"
                              onClick={() => handleCancelBooking(booking._id)}
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {isEditing && (
        <div className={`modal-overlay ${isEditing ? 'active' : ''}`} onClick={() => setIsEditing(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="card edit-profile-modal">
              <div className="card-header">
                <h2 className="card-title">Edit Profile</h2>
                <p className="card-description">Update your personal information</p>
                <button className="modal-close-btn" onClick={() => setIsEditing(false)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
                    <path d="M18 6 6 18"></path>
                    <path d="m6 6 12 12"></path>
                  </svg>
                </button>
              </div>
              <div className="card-content">
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    id="username"
                    className="input"
                    type="text"
                    value={updatedUsername}
                    onChange={(e) => setUpdatedUsername(e.target.value)}
                    placeholder="Enter your username"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    className="input"
                    type="email"
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="modal-actions">
                  <button className="button outline-button" onClick={() => setIsEditing(false)}>
                    Cancel
                  </button>
                  <button className="button primary-button" onClick={handleUpdateUserDetails}>
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;