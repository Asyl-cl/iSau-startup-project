const Cart = ({ cart, onRemoveItem, onUpdateQuantity, onCheckout }) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl p-8 text-center border border-gray-700">
        <div className="text-6xl mb-4">🛒</div>
        <p className="text-gray-400">Себет бос</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Себет</h2>
      <div className="space-y-4 mb-6">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center justify-between bg-gray-700/50 rounded-lg p-4">
            <div className="flex-1">
              <h3 className="text-white font-semibold">{item.name}</h3>
              <p className="text-gray-400 text-sm">{item.price} ₸ × {item.quantity}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 rounded bg-gray-600 hover:bg-gray-500 text-white"
                >
                  −
                </button>
                <span className="text-white w-8 text-center">{item.quantity}</span>
                <button
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 rounded bg-gray-600 hover:bg-gray-500 text-white"
                >
                  +
                </button>
              </div>
              <span className="text-cyan-400 font-semibold w-24 text-right">
                {item.price * item.quantity} ₸
              </span>
              <button
                onClick={() => onRemoveItem(item.id)}
                className="text-red-400 hover:text-red-300 p-2"
              >
                🗑️
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="border-t border-gray-700 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold text-white">Барлығы:</span>
          <span className="text-2xl font-bold text-cyan-400">{total} ₸</span>
        </div>
        <button
          onClick={onCheckout}
          className="w-full py-3 bg-gradient-medical hover:opacity-90 text-white rounded-lg font-semibold transition-opacity"
        >
          Тапсырысты рәсімдеу
        </button>
      </div>
    </div>
  );
};

export default Cart;

