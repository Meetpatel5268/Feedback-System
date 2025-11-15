import { useState } from 'react';

const FeedbackTable = ({ feedbacks, onExportCSV }) => {
  const [ratingFilter, setRatingFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesRating = ratingFilter === 'all' || feedback.rating === parseInt(ratingFilter);
    const matchesSearch =
      feedback.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getRatingColor = (rating) => {
    if (rating >= 4) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (rating === 3) return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
    return 'text-red-400 bg-red-500/20 border-red-500/30';
  };

  return (
    <div className="bg-gray-800 rounded-2xl shadow-xl p-6 border border-gray-700">
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">All Feedback</h2>
        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2.5 bg-gray-700 border-2 border-gray-600 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-gray-500 placeholder-gray-500"
          />
          <select
            value={ratingFilter}
            onChange={(e) => setRatingFilter(e.target.value)}
            className="px-4 py-2.5 bg-gray-700 border-2 border-gray-600 text-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all hover:border-gray-500"
          >
            <option value="all" className="bg-gray-700">All Ratings</option>
            <option value="5" className="bg-gray-700">5 Stars</option>
            <option value="4" className="bg-gray-700">4 Stars</option>
            <option value="3" className="bg-gray-700">3 Stars</option>
            <option value="2" className="bg-gray-700">2 Stars</option>
            <option value="1" className="bg-gray-700">1 Star</option>
          </select>
          <button
            onClick={onExportCSV}
            className="px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl hover:from-indigo-600 hover:to-purple-700 transition-all font-semibold shadow-md hover:shadow-lg transform hover:scale-105"
          >
            Export CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-700/50">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Rating
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 uppercase tracking-wider">
                Created At
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {filteredFeedbacks.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                  No feedback found
                </td>
              </tr>
            ) : (
              filteredFeedbacks.map((feedback) => (
                <tr key={feedback._id} className="hover:bg-gray-700/50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-200">
                    {feedback.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {feedback.email || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-3 py-1.5 rounded-full text-sm font-bold border ${getRatingColor(
                        feedback.rating
                      )}`}
                    >
                      {feedback.rating} ⭐
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400 max-w-md truncate">
                    {feedback.message}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(feedback.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FeedbackTable;

