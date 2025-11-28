const MedicineCard = ({ medicine, onAddToCart }) => {
  return (
    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 transition-all hover:shadow-lg hover:shadow-purple-500/20">
      <div className="text-4xl mb-4">{medicine.image}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{medicine.name}</h3>
      <p className="text-gray-400 text-sm mb-3 line-clamp-2">{medicine.description}</p>
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full">
          {medicine.category}
        </span>
        <span className="text-2xl font-bold text-cyan-400">{medicine.price} ₸</span>
      </div>
      <button
        onClick={() => onAddToCart(medicine)}
        disabled={!medicine.inStock}
        className={`w-full py-2 px-4 rounded-lg font-semibold transition-all ${
          medicine.inStock
            ? 'bg-gradient-medical hover:opacity-90 text-white'
            : 'bg-gray-700 text-gray-500 cursor-not-allowed'
        }`}
      >
        {medicine.inStock ? 'Себетке қосу' : 'Қолда жоқ'}
      </button>
    </div>
  );
};

export default MedicineCard;

