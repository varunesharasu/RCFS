


import React from 'react';
import { Link } from 'react-router-dom';
import './AdminHome.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-card">
        <h1>Welcome to Royal Castle Farm Stay</h1>
        <p>Book your dream resort room today!</p>
        {/* <Link to="/rooms">
          <button className="explore-btn">Explore Rooms</button>
        </Link> */}
      </div>
    </div>
  );
};

export default Home;


// import React, { useState, useEffect } from 'react';
// import { Bell, Calendar, CreditCard, Home, Layers, LogOut, Settings, Users } from 'lucide-react';
// import './AdminHome.css';

// export default function AdminHome() {
//   const [currentTime, setCurrentTime] = useState(new Date());
//   const [activeTab, setActiveTab] = useState('dashboard');
//   const [isLoaded, setIsLoaded] = useState(false);
  
//   useEffect(() => {
//     // Set loaded state after a small delay to trigger animations
//     setTimeout(() => setIsLoaded(true), 100);
    
//     // Update time every minute
//     const timer = setInterval(() => {
//       setCurrentTime(new Date());
//     }, 60000);
    
//     return () => clearInterval(timer);
//   }, []);
  
//   // Mock data for dashboard
//   const stats = [
//     { title: 'Total Bookings', value: '124', change: '+12%', icon: <Calendar className="stat-icon" /> },
//     { title: 'Revenue', value: '$12,845', change: '+8%', icon: <CreditCard className="stat-icon" /> },
//     { title: 'Occupancy', value: '78%', change: '+5%', icon: <Home className="stat-icon" /> },
//     { title: 'New Guests', value: '28', change: '+15%', icon: <Users className="stat-icon" /> },
//   ];
  
//   const recentBookings = [
//     { id: 'B-1001', guest: 'John Smith', room: 'Royal Suite', date: '15 Mar 2025', status: 'Confirmed' },
//     { id: 'B-1002', guest: 'Emma Wilson', room: 'Garden Villa', date: '16 Mar 2025', status: 'Pending' },
//     { id: 'B-1003', guest: 'Michael Brown', room: 'Deluxe Room', date: '18 Mar 2025', status: 'Confirmed' },
//   ];
  
//   const notifications = [
//     { id: 1, message: 'New booking request from Sarah Johnson', time: '10 minutes ago' },
//     { id: 2, message: 'Maintenance required in Room 105', time: '1 hour ago' },
//     { id: 3, message: 'Staff meeting scheduled for tomorrow', time: '3 hours ago' },
//   ];
  
//   return (
//     <div className={`admin-container ${isLoaded ? 'loaded' : ''}`}>
//       <aside className="admin-sidebar">
//         <div className="sidebar-header">
//           <h3>Royal Castle</h3>
//           <p>Admin Panel</p>
//         </div>
        
//         <nav className="sidebar-nav">
//           <button 
//             className={`nav-item ${activeTab === 'dashboard' ? 'active' : ''}`}
//             onClick={() => setActiveTab('dashboard')}
//           >
//             <Layers size={18} />
//             <span>Dashboard</span>
//           </button>
          
//           <button 
//             className={`nav-item ${activeTab === 'bookings' ? 'active' : ''}`}
//             onClick={() => setActiveTab('bookings')}
//           >
//             <Calendar size={18} />
//             <span>Bookings</span>
//           </button>
          
//           <button 
//             className={`nav-item ${activeTab === 'guests' ? 'active' : ''}`}
//             onClick={() => setActiveTab('guests')}
//           >
//             <Users size={18} />
//             <span>Guests</span>
//           </button>
          
//           <button 
//             className={`nav-item ${activeTab === 'rooms' ? 'active' : ''}`}
//             onClick={() => setActiveTab('rooms')}
//           >
//             <Home size={18} />
//             <span>Rooms</span>
//           </button>
          
//           <button 
//             className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
//             onClick={() => setActiveTab('settings')}
//           >
//             <Settings size={18} />
//             <span>Settings</span>
//           </button>
//         </nav>
        
//         <div className="sidebar-footer">
//           <button className="logout-btn">
//             <LogOut size={18} />
//             <span>Logout</span>
//           </button>
//         </div>
//       </aside>
      
//       <main className="admin-main">
//         <header className="admin-header">
//           <div className="header-welcome">
//             <h2>Welcome, Admin</h2>
//             <p>{currentTime.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
//           </div>
          
//           <div className="header-actions">
//             <button className="notification-btn">
//               <Bell size={20} />
//               <span className="notification-badge">3</span>
//             </button>
//             <div className="admin-avatar">
//               <img src="/placeholder.svg?height=40&width=40" alt="Admin" />
//             </div>
//           </div>
//         </header>
        
//         <div className="dashboard-content">
//           <section className="stats-section">
//             <h3 className="section-title">Overview</h3>
//             <div className="stats-grid">
//               {stats.map((stat, index) => (
//                 <div className="stat-card" key={index} style={{animationDelay: `${index * 0.1}s`}}>
//                   <div className="stat-icon-wrapper">
//                     {stat.icon}
//                   </div>
//                   <div className="stat-info">
//                     <h4>{stat.title}</h4>
//                     <div className="stat-value">{stat.value}</div>
//                     <div className="stat-change">{stat.change}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </section>
          
//           <div className="dashboard-grid">
//             <section className="bookings-section">
//               <div className="section-header">
//                 <h3 className="section-title">Recent Bookings</h3>
//                 <button className="view-all-btn">View All</button>
//               </div>
              
//               <div className="bookings-table-wrapper">
//                 <table className="bookings-table">
//                   <thead>
//                     <tr>
//                       <th>ID</th>
//                       <th>Guest</th>
//                       <th>Room</th>
//                       <th>Date</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {recentBookings.map((booking, index) => (
//                       <tr key={booking.id} style={{animationDelay: `${index * 0.1}s`}}>
//                         <td>{booking.id}</td>
//                         <td>{booking.guest}</td>
//                         <td>{booking.room}</td>
//                         <td>{booking.date}</td>
//                         <td>
//                           <span className={`status-badge ${booking.status.toLowerCase()}`}>
//                             {booking.status}
//                           </span>
//                         </td>
//                       </tr>
//                     ))}
//                   </tbody>
//                 </table>
//               </div>
//             </section>
            
//             <section className="notifications-section">
//               <h3 className="section-title">Notifications</h3>
//               <div className="notifications-list">
//                 {notifications.map((notification, index) => (
//                   <div 
//                     className="notification-item" 
//                     key={notification.id}
//                     style={{animationDelay: `${index * 0.1}s`}}
//                   >
//                     <p className="notification-message">{notification.message}</p>
//                     <span className="notification-time">{notification.time}</span>
//                   </div>
//                 ))}
//               </div>
//             </section>
//           </div>
          
//           <section className="quick-actions">
//             <h3 className="section-title">Quick Actions</h3>
//             <div className="actions-grid">
//               <button className="action-card">
//                 <Calendar size={24} />
//                 <span>New Booking</span>
//               </button>
//               <button className="action-card">
//                 <Users size={24} />
//                 <span>Add Guest</span>
//               </button>
//               <button className="action-card">
//                 <Home size={24} />
//                 <span>Room Status</span>
//               </button>
//               <button className="action-card">
//                 <CreditCard size={24} />
//                 <span>Payments</span>
//               </button>
//             </div>
//           </section>
//         </div>
//       </main>
//     </div>
//   );
// }
