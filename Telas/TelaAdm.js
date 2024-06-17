import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';

const API_URL = 'http://localhost:3000';

const TelaAdm = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await axios.get(`${API_URL}/orders`);
      setOrders(response.data);
    };

    fetchOrders();
  }, []);

  return (
    <View>
      <Text>Admin Dashboard</Text>
      {orders.map((order, index) => (
        <View key={index}>
          <Text>Order #{index + 1}</Text>
          {order.products.map((product, idx) => (
            <Text key={idx}>{product.name} - ${product.price}</Text>
          ))}
          <Text>Shipping: ${order.shippingCost}</Text>
          <Text>Total: ${order.total}</Text>
        </View>
      ))}
    </View>
  );
};

export default TelaAdm;
