import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-medical flex items-center justify-center">
                <svg width="24" height="24" viewBox="0 0 56 56" fill="none">
                  <path d="M28 18 L28 38 M18 28 L38 28" stroke="white" strokeWidth="3.5" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent">
                iSau
              </h3>
            </div>
            <p className="text-gray-400 text-sm">
              Барлық медициналық қызметтер бір платформада
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Қызметтер</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/telemedicine" className="text-gray-400 hover:text-white transition-colors">
                  Телемедицина
                </Link>
              </li>
              <li>
                <Link to="/hospitals" className="text-gray-400 hover:text-white transition-colors">
                  Ауруханалар
                </Link>
              </li>
              <li>
                <Link to="/pharmacy" className="text-gray-400 hover:text-white transition-colors">
                  Дәрі-дәрмек
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Біз туралы</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/security" className="text-gray-400 hover:text-white transition-colors">
                  Қауіпсіздік
                </Link>
              </li>
              <li>
                <a href="tel:+77771234567" className="text-gray-400 hover:text-white transition-colors">
                  📞 +7 (777) 123-45-67
                </a>
              </li>
              <li>
                <a href="mailto:info@isau.kz" className="text-gray-400 hover:text-white transition-colors">
                  ✉️ info@isau.kz
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Байланыс</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li>📍 Алматы, Қазақстан</li>
              <li>
                <a href="tel:103" className="hover:text-white transition-colors">
                  🚑 Скорая: 103
                </a>
              </li>
              <li className="flex gap-4 mt-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-400">
          <p>&copy; 2025 iSau. Барлық құқықтар қорғалған.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

