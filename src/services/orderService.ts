// src/services/orderService.ts
export interface Order {
    id: string;
    productName: string;
    date: string;
    amount: number;
    transactionHash: string;
    status: 'completed' | 'pending' | 'failed';
  }
  
  export const saveOrder = (order: Omit<Order, 'id' | 'date'>): Order => {
    const orders = getOrders();
    const newOrder: Order = {
      ...order,
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      status: 'completed'
    };
    localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
    return newOrder;
  };
  
  export const getOrders = (): Order[] => {
    return JSON.parse(localStorage.getItem('orders') || '[]');
  };