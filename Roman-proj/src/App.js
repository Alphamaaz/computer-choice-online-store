import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Routes/Home";
import Laptops from "./Routes/Laptops";
import Ssds from "./Routes/Ssds";
import Chargers from "./Routes/Chargers";
import Contact from "./Routes/Contact";
import Signup from "./Routes/Signup";
import Header from "./Components/Homepage/Header";
import AdminDashboard from "./Routes/AdminDashboard";
import AdminRoute from "./AdminRoute";

function App() {
  return (
    <Router>
      {/* Optional: show header on all pages */}
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
        <Route path="/laptops" element={<Laptops />} />
        <Route path="/ssds" element={<Ssds />} />
        <Route path="/chargers" element={<Chargers />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
