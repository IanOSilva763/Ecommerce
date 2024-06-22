import React, { useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const TelaCarrinho = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState(route.params.cartItems);

  const removeItem = (cartId) => {
    setCartItems(cartItems.filter(item => item.cartId !== cartId));
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.CarrinhoContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <Text style={styles.itemNome}>{item.name}</Text>
      <Text style={styles.itemPreco}>R$ {item.price}</Text>
      <Button title="Remover" onPress={() => removeItem(item.cartId)} />
    </View>
  );

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.cartId}
        renderItem={renderCartItem}
        contentContainerStyle={styles.list}
      />
      <Text style={styles.textoTotal}>Total: R$ {total.toFixed(2)}</Text>
      <Button
        title="Finalizar Compra"
        onPress={() => Alert.alert('Compra Finalizada', 'Obrigado por comprar conosco!')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  list: {
    paddingBottom: 10,
  },
  CarrinhoContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemNome: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  itemPreco: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    color: '#28a745',
  },
  textoTotal: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
  },
});

export default TelaCarrinho;
