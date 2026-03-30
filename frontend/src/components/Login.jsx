import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authAPI } from "../services/api";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authAPI.login(formData.username, formData.password);
      toast.success("Login successful!");
      navigate("/feedback");
    } catch (error) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="center-page">
      {/* Enhanced Background Elements */}
      <div className="background-elements">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="glass-container">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Student Feedback
          </h1>
          <p className="text-white-70">Sign in to submit your feedback</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-white font-medium mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                required
                className="glass-input"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-white font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                required
                className="glass-input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="glass-button glass-button-primary w-full"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white-50 text-sm">
            Demo: Use any username and password
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
