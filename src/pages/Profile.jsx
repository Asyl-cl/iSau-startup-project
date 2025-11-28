import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser, isAuthenticated } from '../utils/auth';

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/login');
      return;
    }

    const currentUser = getCurrentUser();
    setUser(currentUser);

    // Загружаем заказы
    const savedOrders = JSON.parse(localStorage.getItem('isau_orders') || '[]');
    setOrders(savedOrders.reverse()); // Последние сверху
  }, [navigate]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 flex items-center justify-center">
        <div className="text-gray-400">Жүктелуде...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Жеке кабинет
        </h1>

        {/* Информация о пользователе */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-6">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 rounded-full bg-gradient-medical flex items-center justify-center text-3xl">
              {user.fullName ? user.fullName.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                {user.fullName || 'Пайдаланушы'}
              </h2>
              <p className="text-gray-400">{user.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-cyan-400 mb-1">{orders.length}</div>
              <div className="text-sm text-gray-400">Тапсырыстар</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-purple-400 mb-1">
                {orders.reduce((sum, order) => sum + order.total, 0)} ₸
              </div>
              <div className="text-sm text-gray-400">Барлығы жұмсалған</div>
            </div>
            <div className="bg-gray-700/50 rounded-lg p-4">
              <div className="text-2xl font-bold text-green-400 mb-1">⭐</div>
              <div className="text-sm text-gray-400">Статус</div>
            </div>
          </div>
        </div>

        {/* История заказов */}
        <div className="bg-gray-800 rounded-xl p-8 border border-gray-700">
          <h3 className="text-xl font-semibold text-white mb-6">Тапсырыстар тарихы</h3>
          
          {orders.length > 0 ? (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-700/50 rounded-lg p-6 border border-gray-600"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="text-white font-semibold">
                        Тапсырыс №{order.id}
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(order.date).toLocaleString('kk-KZ')}
                      </div>
                    </div>
                    <div className="text-xl font-bold text-cyan-400">
                      {order.total} ₸
                    </div>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between text-sm"
                      >
                        <span className="text-gray-300">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="text-gray-400">
                          {item.price * item.quantity} ₸
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400">
              <div className="text-6xl mb-4">📦</div>
              <p>Тапсырыстар табылмады</p>
              <a
                href="/pharmacy"
                className="text-purple-400 hover:text-purple-300 mt-4 inline-block"
              >
                Дәрі-дәрмектерге өту →
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

