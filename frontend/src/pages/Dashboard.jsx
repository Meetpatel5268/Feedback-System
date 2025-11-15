import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import api from '../api/axios';
import StatCard from '../components/StatCard';
import FeedbackTable from '../components/FeedbackTable';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalFeedbacks: 0,
    avgRating: 0,
    positiveCount: 0,
    negativeCount: 0,
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsRes, feedbacksRes] = await Promise.all([
        api.get('/api/stats'),
        api.get('/api/feedback'),
      ]);

      setStats(statsRes.data);
      setFeedbacks(feedbacksRes.data);
    } catch (error) {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        navigate('/login');
        toast.error('Please login to continue');
      } else {
        toast.error('Failed to load dashboard data');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    const headers = ['Name', 'Email', 'Rating', 'Message' ];
    const rows = feedbacks.map((f) => [
      f.name,
      f.email || 'N/A',
      f.rating,
      `"${f.message.replace(/"/g, '""')}"`,
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `feedback-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('CSV exported successfully!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-4 text-lg font-semibold text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent mb-2">
            Dashboard
          </h1>
          <p className="text-gray-400">Overview of all feedback and analytics</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Feedback"
            value={stats.totalFeedbacks}
            icon="💬"
            color="blue"
          />
          <StatCard
            title="Average Rating"
            value={stats.avgRating.toFixed(1)}
            icon="⭐"
            color="yellow"
          />
          <StatCard
            title="Positive Feedback"
            value={stats.positiveCount}
            icon="👍"
            color="green"
          />
          <StatCard
            title="Negative Feedback"
            value={stats.negativeCount}
            icon="👎"
            color="red"
          />
        </div>

        <FeedbackTable feedbacks={feedbacks} onExportCSV={handleExportCSV} />
      </div>
    </div>
  );
};

export default Dashboard;

