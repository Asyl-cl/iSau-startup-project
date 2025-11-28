import { useState, useMemo } from 'react';
import medicinesData from '../data/medicines.json';
import MedicineCard from '../components/MedicineCard';
import Cart from '../components/Cart';

const Pharmacy = () => {
  const [medicines] = useState(medicinesData);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = ['all', ...new Set(medicines.map(m => m.category))];

  const filteredMedicines = useMemo(() => {
    return medicines.filter(medicine => {
      const matchesSearch = medicine.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           medicine.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || medicine.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [medicines, searchQuery, selectedCategory]);

  const addToCart = (medicine) => {
    const existingItem = cart.find(item => item.id === medicine.id);
    if (existingItem) {
      setCart(cart.map(item =>
        item.id === medicine.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...medicine, quantity: 1 }]);
    }
  };

  const removeFromCart = (medicineId) => {
    setCart(cart.filter(item => item.id !== medicineId));
  };

  const updateQuantity = (medicineId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(medicineId);
      return;
    }
    setCart(cart.map(item =>
      item.id === medicineId ? { ...item, quantity } : item
    ));
  };

  const handleCheckout = () => {
    const order = {
      id: Date.now(),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      date: new Date().toISOString()
    };
    
    console.log('Заказ оформлен:', order);
    alert(`Тапсырыс сәтті рәсімделді! Барлығы: ${order.total} ₸`);
    setCart([]);
    
    // Сохраняем заказ в localStorage
    const orders = JSON.parse(localStorage.getItem('isau_orders') || '[]');
    orders.push(order);
    localStorage.setItem('isau_orders', JSON.stringify(orders));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Дәрі-дәрмектер
        </h1>
        <p className="text-center text-gray-400 mb-8">
          Медикаменттерді онлайн тапсырыс беру
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Фильтры и поиск */}
          <div className="lg:col-span-3">
            <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Дәрі-дәрмекті іздеу..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'Барлығы' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredMedicines.length > 0 ? (
                filteredMedicines.map(medicine => (
                  <MedicineCard
                    key={medicine.id}
                    medicine={medicine}
                    onAddToCart={addToCart}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12 text-gray-400">
                  <div className="text-6xl mb-4">🔍</div>
                  <p>Дәрі-дәрмектер табылмады</p>
                </div>
              )}
            </div>
          </div>

          {/* Корзина */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Cart
                cart={cart}
                onRemoveItem={removeFromCart}
                onUpdateQuantity={updateQuantity}
                onCheckout={handleCheckout}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pharmacy;

