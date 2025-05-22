import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';

import Header from "./components/Header";
import Footer from "./components/Footer";

import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import UserDashboard from "./pages/UserDashboard"; // or HabitDashboard
import Home from "./pages/Home";

import AddHabit from "./pages/AddHabit";
import EditHabit from "./pages/EditHabit";

import ProtectedRoute from "./components/ProtectedRoute";

const App = () => (
  <Router>
    <Header />
    <main className="min-h-screen bg-white pt-4 pb-20">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* User Dashboard & Habit management */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/add-habit"
          element={
            <ProtectedRoute requiredRole="user">
              <AddHabit />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-habit/:id"
          element={
            <ProtectedRoute requiredRole="user">
              <EditHabit />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </main>
    <Footer />
  </Router>
);

export default App;
