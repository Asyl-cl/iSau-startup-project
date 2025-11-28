import { Link, useNavigate } from 'react-router-dom';
import { getCurrentUser, logout, isAuthenticated } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getCurrentUser();
  const authenticated = isAuthenticated();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gray-900/90 backdrop-blur-lg border-b border-gray-800 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 rounded-2xl bg-gradient-medical flex items-center justify-center shadow-lg shadow-purple-500/30 group-hover:shadow-purple-500/50 transition-shadow">
              <svg width="32" height="32" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M28 18 L28 38 M18 28 L38 28" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="28" cy="28" r="20" stroke="white" strokeWidth="2" fill="none" opacity="0.3"/>
              </svg>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              iSau
            </h1>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-gray-300 hover:text-white transition-colors">Басты бет</Link>
            <Link to="/telemedicine" className="text-gray-300 hover:text-white transition-colors">Телемедицина</Link>
            <Link to="/hospitals" className="text-gray-300 hover:text-white transition-colors">Ауруханалар</Link>
            <Link to="/pharmacy" className="text-gray-300 hover:text-white transition-colors">Дәрі-дәрмек</Link>
            <Link to="/security" className="text-gray-300 hover:text-white transition-colors">Қауіпсіздік</Link>
          </div>

          <div className="flex items-center gap-4">
            {authenticated && user ? (
              <>
                <Link 
                  to="/profile" 
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  {user.fullName || user.email}
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white"
                >
                  Шығу
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                >
                  Кіру
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 bg-gradient-medical hover:opacity-90 rounded-lg transition-opacity text-white font-semibold"
                >
                  Тіркелу
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden mt-4 pt-4 border-t border-gray-800 flex flex-wrap gap-2">
          <Link to="/telemedicine" className="text-sm text-gray-300 hover:text-white">Телемедицина</Link>
          <Link to="/hospitals" className="text-sm text-gray-300 hover:text-white">Ауруханалар</Link>
          <Link to="/pharmacy" className="text-sm text-gray-300 hover:text-white">Дәрі-дәрмек</Link>
          <Link to="/security" className="text-sm text-gray-300 hover:text-white">Қауіпсіздік</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

