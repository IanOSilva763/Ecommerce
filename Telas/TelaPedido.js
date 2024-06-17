import React, { useContext, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { CarrinhoContexto } from '../CarrinhoContexto';
import { calculateShipping } from '../shippingCalculator';

const TelaPedido = () => {
  const { cart } = useContext(CarrinhoContexto);
  const [shipping, setShipping] = useState(null);

  const handleCheckout = async () => {
    const shippingInfo = await calculateShipping('12345678');
    setShipping(shippingInfo);
  };

  const total = cart.reduce((sum, product) => sum + product.price, 0) + (shipping ? shipping.shippingCost : 0);

  return (
    <View>
      <Text>Order Summary</Text>
      {cart.map(product => (
        <Text key={product.id}>{product.name} - ${product.price}</Text>
      ))}
      {shipping && (
        <>
          <Text>Shipping Cost: ${shipping.shippingCost}</Text>
          <Text>Delivery Time: {shipping.deliveryTime}</Text>
        </>
      )}
      <Text>Total: ${total}</Text>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

export default TelaPedido;
