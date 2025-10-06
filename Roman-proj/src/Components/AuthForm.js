import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./AuthForm.css";
import api from "../API/apiService";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(false); 
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (!password || (!isLogin && (!username || !email || !confirmPassword))) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      setLoading(true);
      let response;

      if (isLogin) {
        // LOGIN request
        response = await api.post("/auth/login", { email, password });

        alert("Login successful!");
        console.log("Response:", response.data?.data?.token);

        // Save token
        if (response.data?.data?.token) {
          localStorage.setItem("user", JSON.stringify(response.data.data.user));
          localStorage.setItem("token", response.data.data.token);

          // ✅ Check role
          if (response.data.data.user.role === "admin") {
            window.location.href = "/admin"; // Redirect to admin dashboard
          } else {
            window.location.href = "/"; // Redirect normal users to homepage
          }
        }

       

      } else {
        // REGISTER request
        response = await api.post("/auth/register", {
          username,
          email,
          password,
          role: "user", // default role
        });

        alert("Registration successful! Please login.");
        console.log("Response:", response.data);

        // switch to login mode
        setIsLogin(true);
      }

      // reset form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Auth error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit} className="auth-form">
        <h2>{isLogin ? "Login" : "Register"}</h2>

        {!isLogin && (
          <>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </>
        )}

        {isLogin && (
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        )}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        {!isLogin && (
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        )}

        <button type="submit" className="auth-btn" disabled={loading}>
          {loading ? "Please wait..." : isLogin ? "Login" : "Register"}
        </button>

        <p className="auth-toggle" onClick={() => setIsLogin(!isLogin)}>
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </p>
      </form>
    </div>
  );
};

export default AuthForm;
