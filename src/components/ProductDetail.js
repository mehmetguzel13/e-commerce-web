import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaArrowLeft } from 'react-icons/fa';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }

        const data = await response.json();
        setProduct(data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch product details. Please try again later.');
        console.error('Fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
      </div>
    );
  }

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

      <button 
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center text-gray-600 hover:text-gray-800"
      >
        <FaArrowLeft className="mr-2" /> Back
      </button>

      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-center justify-center">
            <img 
              src={product.image} 
              alt={product.title}
              className="max-w-full h-auto max-h-96 object-contain"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.title}</h1>
            <div className="bg-gray-100 px-4 py-2 rounded-lg mb-4">
              <span className="text-4xl font-bold text-gray-800">${product.price}</span>
            </div>
            <p className="text-gray-600 mb-6">{product.description}</p>
            <div className="space-y-4">
              <button 
                onClick={handleAddToCart}
                className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
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

export default ProductDetail; 