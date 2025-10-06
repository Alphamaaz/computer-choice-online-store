import React, { useState } from 'react';
import './CartCheckout.css';

const CartCheckout = () => {
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [address, setAddress] = useState({
    name: '',
    phone: '',
    city: '',
    fullAddress: ''
  });

  const cartItems = [
    { name: 'HP EliteBook 840', price: 500, deliveryEstimate: '3-5 days' },
    { name: 'Dell Latitude 7480', price: 480, deliveryEstimate: '4-6 days' }
  ];

  const totalPrice = cartItems.reduce((acc, item) => acc + item.price, 0);

  const handleConfirm = () => {
    if (paymentMethod && address.name && address.phone && address.city && address.fullAddress) {
      setStep(3);
    } else {
      alert('Please complete all required fields.');
    }
  };

  return (
    <div className="checkout-container">
      {step === 1 && (
        <div className="cart-summary">
          <h2>Cart Summary</h2>
          {cartItems.map((item, index) => (
            <div key={index} className="cart-item">
              <p><strong>{item.name}</strong></p>
              <p>Price: ${item.price}</p>
              <p>Delivery: {item.deliveryEstimate}</p>
            </div>
          ))}
          <h3>Total: ${totalPrice}</h3>
          <button onClick={() => setStep(2)}>Proceed to Checkout</button>
        </div>
      )}

      {step === 2 && (
        <div className="checkout-form">
          <h2>Checkout</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="text" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input type="tel" value={address.phone} onChange={(e) => setAddress({ ...address, phone: e.target.value })} />
          </div>
          <div className="form-group">
            <label>City</label>
            <input type="text" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
          </div>
          <div className="form-group">
            <label>Full Address</label>
            <textarea value={address.fullAddress} onChange={(e) => setAddress({ ...address, fullAddress: e.target.value })}></textarea>
          </div>

          <div className="payment-options">
            <h3>Payment Options</h3>
            <label>
              <input type="radio" name="payment" value="COD" onChange={(e) => setPaymentMethod(e.target.value)} />
              Cash on Delivery (COD)
            </label>
            <label>
              <input type="radio" name="payment" value="JazzCash" onChange={(e) => setPaymentMethod(e.target.value)} />
              JazzCash / EasyPaisa
            </label>
          </div>

          <button onClick={handleConfirm}>Confirm Order</button>
        </div>
      )}

      {step === 3 && (
        <div className="confirmation">
          <h2>Order Confirmed ✅</h2>
          <p>Thank you, <strong>{address.name}</strong>!</p>
          <p>Your order will be delivered to <strong>{address.fullAddress}, {address.city}</strong>.</p>
          <p>We will contact you at <strong>{address.phone}</strong>.</p>
          <p><strong>Payment Method:</strong> {paymentMethod}</p>
          <p><strong>Total Amount:</strong> ${totalPrice}</p>
        </div>
      )}
    </div>
  );
};

export default CartCheckout;
