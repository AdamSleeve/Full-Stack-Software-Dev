import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, addedToCart, onRemoveFromCart, onAddonCart, onDecFromCart}) => {
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return addedToCart.reduce((total, item) => {
      const cost = parseFloat(item.cost.replace('$', '')) || 0; // Ensure cost is a number
      const quantity = parseInt(item.quantity, 10) || 0; // Ensure quantity is a number
      return total + cost * quantity;
    }, 0);
  };

  const handleIncrement = (item) => {
     // Call the passed updateQuantity function
    // updateQuantity(item.quantity + 1);
    //updateQuantity(item.quantity + 1);
    //dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }));
    // dispatch(updateQuantity({ ...item, quantity: item.quantity +=1 }));
    onAddonCart(item.name);
  };
  

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
        // Call the passed updateQuantity function
       // updateQuantity(item.quantity - 1);
      //dispatch(updateQuantity({ ...item, quantity: item.quantity - 1 }));
      // Dispatch the action to update quantity
      //dispatch(updateQuantity({ id: item.id, quantity: item.quantity -= 1 }));
      onDecFromCart(item.name);
    } else {
      onRemoveFromCart(item.name); // Call the passed onRemoveFromCart function
    }
  };

  const handleRemove = (item) => {
    onRemoveFromCart(item.name); // Call the passed onRemoveFromCart function
  };

  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace('$', '')) || 0; // Ensure cost is a number
    return cost * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
      <div>
        {addedToCart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item).toFixed(2)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
              
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => onContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;