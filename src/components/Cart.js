import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaTrash, FaMinus, FaPlus } from 'react-icons/fa';

function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      updateQuantity(item.id, newQuantity);
    } else {
      removeFromCart(item.id);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map(item => (
              <div key={item.id} className="flex items-center border-b pb-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-24 h-24 object-contain"
                />
                <div className="flex-grow ml-4">
                  <h3 className="text-lg font-semibold text-gray-800">{item.title}</h3>
                  <p className="text-gray-600">${item.price}</p>
                  <div className="flex items-center mt-2">
                    <button 
                      onClick={() => handleQuantityChange(item, -1)}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <FaMinus size={14} />
                    </button>
                    <span className="px-4 py-1">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item, 1)}
                      className="text-gray-500 hover:text-gray-700 p-1"
                    >
                      <FaPlus size={14} />
                    </button>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="font-semibold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 mt-2"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 border-t pt-8">
            <div className="flex justify-between text-xl font-bold text-gray-800 mb-4">
              <span>Total:</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <Link 
              to="/checkout" 
              className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700"
            >
              Proceed to Checkout
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart; 