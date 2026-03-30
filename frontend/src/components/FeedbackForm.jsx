import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { feedbackAPI, authAPI } from "../services/api";
import toast from "react-hot-toast";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    rating: 0,
    studentName: "",
  });
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    if (!currentUser) {
      navigate("/");
      return;
    }
    setUser(currentUser);
    setFormData((prev) => ({ ...prev, studentName: currentUser.name }));
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.rating === 0) {
      toast.error("Please select a rating");
      return;
    }

    setLoading(true);

    try {
      await feedbackAPI.submitFeedback(formData);
      toast.success("Feedback submitted successfully!");
      setFormData({
        subject: "",
        message: "",
        rating: 0,
        studentName: user.name,
      });
    } catch (error) {
      toast.error("Failed to submit feedback");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    navigate("/");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="center-page">
      {/* Enhanced Background Elements */}
      <div className="background-elements">
        <div></div>
        <div></div>
        <div></div>
      </div>

      <div className="glass-container">
        <div className="header-container">
          <h1 className="text-3xl font-bold text-white">Submit Feedback</h1>
          <div className="header-actions">
            <span className="text-white-70">Welcome, {user.name}</span>
            <button
              onClick={handleLogout}
              className="glass-button glass-button-secondary"
            >
              Logout
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="glass-card">
            <label className="block text-white font-medium mb-3">Subject</label>
            <input
              type="text"
              name="subject"
              required
              className="glass-input"
              placeholder="Enter feedback subject"
              value={formData.subject}
              onChange={handleChange}
            />
          </div>

          <div className="glass-card">
            <label className="block text-white font-medium mb-3">Message</label>
            <textarea
              name="message"
              rows={4}
              required
              className="glass-input resize-none"
              placeholder="Enter your feedback message"
              value={formData.message}
              onChange={handleChange}
            />
          </div>

          <div className="glass-card">
            <label className="block text-white font-medium mb-3">Rating</label>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => handleRatingChange(star)}
                  className={`star-button ${
                    star <= formData.rating ? "active" : ""
                  }`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            <p className="text-white-70 text-sm mt-3 text-center">
              Selected: {formData.rating} star{formData.rating !== 1 ? "s" : ""}
            </p>
          </div>

          <div className="flex justify-center space-x-4">
            <Link
              to="/feedback-list"
              className="glass-button glass-button-secondary"
            >
              View All Feedback
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="glass-button glass-button-primary"
            >
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
