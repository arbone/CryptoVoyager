import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Order, getOrders } from '../../utils/orderService';
import './MyBookings.css';

const MyBookings: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    setOrders(getOrders());
  }, []);

  return (
    <div className="bookings-container">
      <h1>I Miei Ordini</h1>
      
      {orders.length === 0 ? (
        <div className="empty-state">
          <p>Nessun ordine effettuato</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <h3>{order.productName}</h3>
                <span className={`status-badge ${order.status}`}>
                  {order.status === 'completed' ? 'Completato' : 'In elaborazione'}
                </span>
              </div>
              
              <div className="order-details">
                <p>Data: {new Date(order.date).toLocaleDateString()}</p>
                <p>Importo: {order.amount} ETH</p>
                <a 
                  href={`https://sepolia.etherscan.io/tx/${order.transactionHash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transaction-link"
                >
                  Vedi transazione
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;