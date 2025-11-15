import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:opacity-90 transition">
            <span className="bg-gradient-to-br from-indigo-500 to-purple-600 p-2 rounded-lg shadow-lg">📊</span>
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Feedback Manager</span>
          </Link>
          <div className="flex gap-4 items-center">
            <Link to="/" className="hover:text-indigo-400 transition font-medium px-3 py-2 rounded-lg hover:bg-gray-700/50">
              Submit Feedback
            </Link>
            {token ? (
              <>
                <Link to="/dashboard" className="hover:text-indigo-400 transition font-medium px-3 py-2 rounded-lg hover:bg-gray-700/50">
                  Dashboard
                </Link>
                <Link to="/admins" className="hover:text-indigo-400 transition font-medium px-3 py-2 rounded-lg hover:bg-gray-700/50">
                  Admins
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-gray-700/50 hover:bg-gray-700 px-4 py-2 rounded-lg transition font-medium border border-gray-600 hover:border-gray-500"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="hover:text-indigo-400 transition font-medium px-3 py-2 rounded-lg hover:bg-gray-700/50">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

