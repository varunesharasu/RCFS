import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminNavbar from './components/AdminNavbar';
import Room from './components/room';
import AdminHome from './components/AdminHome'; // Import the new AdminHome component

// Protected Route for Admin
const ProtectedRouteAdmin = ({ children }) => {
  const adminToken = localStorage.getItem('adminToken');
  return adminToken ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Admin Home Route (Protected) */}
        <Route
          path="/admin/home"
          element={
            <ProtectedRouteAdmin>
              <>
                <AdminNavbar />
                <AdminHome /> {/* Render the AdminHome component */}
              </>
            </ProtectedRouteAdmin>
          }
        />

        {/* Admin Dashboard Route (Protected) */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRouteAdmin>
              <>
                <AdminNavbar />
                <AdminDashboard />
              </>
            </ProtectedRouteAdmin>
          }
        />

        {/* Admin Rooms Route (Protected) */}
        <Route
          path="/admin/rooms"
          element={
            <ProtectedRouteAdmin>
              <>
                <AdminNavbar />
                <Room />
              </>
            </ProtectedRouteAdmin>
          }
        />

        {/* Redirect /admin to /admin/home */}
        <Route path="/admin" element={<Navigate to="/admin/home" />} />

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/admin/login" />} />
      </Routes>
    </Router>
  );
}

export default App;