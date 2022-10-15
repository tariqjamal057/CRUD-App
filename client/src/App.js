import React from 'react'
import { Routes, Route } from "react-router-dom";
import './App.css';
import Category from './pages/dashboard/Category';
import Department from './pages/dashboard/Department';
import Employee from './pages/dashboard/Employee';
import Dashboard from './pages/dashboard/Dashboard';
import Login from './pages/login/Login';
import PersonDashboard from './pages/person/PersonDashboard';
import MyComplaints from './pages/person/MyComplaints';
import InChargeComplaint from './pages/person/InChargeComplaint';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-employee" element={<Employee/>} />
        <Route path="/add-department" element={<Department/>} />
        <Route path="/add-category" element={<Category/>} />
        <Route path="/" element={< PersonDashboard/>} />
        <Route path="/my_complaints" element={< MyComplaints/>} />
        <Route path="/complaints" element={< InChargeComplaint/>} />
      </Routes>
    </div>
  );
}

export default App;
