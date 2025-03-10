import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaSearch } from 'react-icons/fa';

function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="relative">
      {showAlert && (
        <div className="fixed bottom-10 left-0 right-0 flex justify-center z-50">
          <div className="bg-green-500 text-white px-8 py-4 rounded-lg shadow-lg animate-fade-in-up mx-4">
            <p className="text-center font-medium text-lg whitespace-normal">
              {product.title} 
              <span className="block text-sm mt-1">added to cart!</span>
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
        <Link to={`/product/${product.id}`} className="block relative group">
          <div className="aspect-w-1 aspect-h-1">
            <img 
              src={product.image} 
              alt={product.title}
              className="w-full h-48 object-contain p-4"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white p-2 rounded-full">
                <FaSearch className="text-gray-800" />
              </div>
            </div>
          </div>
        </Link>
        <div className="p-4">
          <Link to={`/product/${product.id}`}>
            <h2 className="text-lg font-semibold text-gray-800 truncate hover:text-blue-600">
              {product.title}
            </h2>
          </Link>
          <p className="text-gray-600 mt-2 text-sm line-clamp-2">
            {product.description}
          </p>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-800">
              ${product.price}
            </span>
            <div className="space-x-2">
              <Link 
                to={`/product/${product.id}`}
                className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Details
              </Link>
              <button 
                onClick={handleAddToCart}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard; 