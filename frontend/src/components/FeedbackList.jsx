import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { feedbackAPI, authAPI } from "../services/api";
import toast from "react-hot-toast";

const FeedbackList = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authAPI.getCurrentUser();
    if (!currentUser) {
      navigate("/");
      return;
    }
    setUser(currentUser);
    fetchFeedback();
  }, [navigate]);

  const fetchFeedback = async () => {
    try {
      const data = await feedbackAPI.getAllFeedback();
      setFeedback(data);
    } catch (error) {
      toast.error("Failed to fetch feedback");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    authAPI.logout();
    navigate("/");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderStars = (rating) => {
    return (
      <div className="feedback-stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`mx-1 ${
              star <= rating ? "text-yellow-400" : "text-white-50"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
        <span className="ml-2 text-white-70 text-sm">{rating}/5</span>
      </div>
    );
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
          <h1 className="text-3xl font-bold text-white">All Feedback</h1>
          <div className="header-actions">
            <span className="text-white-70">Welcome, {user.name}</span>
            <div className="flex space-x-3">
              <Link
                to="/feedback"
                className="glass-button glass-button-primary"
              >
                Submit New Feedback
              </Link>
              <button
                onClick={handleLogout}
                className="glass-button glass-button-secondary"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        ) : feedback.length === 0 ? (
          <div className="glass-card text-center py-12">
            <p className="text-white-70 text-xl mb-6">
              No feedback submitted yet.
            </p>
            <Link to="/feedback" className="glass-button glass-button-primary">
              Be the first to submit feedback
            </Link>
          </div>
        ) : (
          <div className="feedback-scroll space-y-4">
            {feedback.map((item) => (
              <div key={item.id} className="glass-card">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-semibold text-white">
                    {item.subject}
                  </h3>
                  <div className="text-white-50 text-sm">
                    {formatDate(item.createdAt)}
                  </div>
                </div>

                <div className="mb-3">
                  <p className="text-white-70 leading-relaxed">
                    {item.message}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    {renderStars(item.rating)}
                    <span className="text-white-70 text-sm">
                      by {item.studentName}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeedbackList;
