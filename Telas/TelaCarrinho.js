import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';

const TelaCarrinho = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const cartItemsJson = await AsyncStorage.getItem('@cartItems');
        if (cartItemsJson !== null) {
          const parsedCartItems = JSON.parse(cartItemsJson).filter(item => !item.removed); // Filtra itens removidos
          setCartItems(parsedCartItems);
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    };

    loadCartItems();
  }, []);

  const removeItem = async (cartId) => {
    const updatedCartItems = cartItems.map(item => {
      if (item.cartId === cartId) {
        return { ...item, removed: true }; // Marca o item como removido
      }
      return item;
    }).filter(item => !item.removed);
    setCartItems(updatedCartItems);
    try {
      await AsyncStorage.setItem('@cartItems', JSON.stringify(updatedCartItems.filter(item => !item.removed))); // Salva apenas os itens não removidos
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
  };

  const removeAllItems = async () => {
    try {
      // Salvar a compra como histórico na TelaDashboard
      const data = new Date();
      const compra = {
        id: data.getTime().toString(),
        data: `${data.getDate()}/${data.getMonth() + 1}/${data.getFullYear()}`,
        horario: `${data.getHours()}:${data.getMinutes()}`,
        valorTotal: cartItems.reduce((total, item) => total + parseFloat(item.price), 0),
        itens: cartItems.map(item => ({ id: item.id, nome: item.name, preco: parseFloat(item.price) }))
      };

      // Carregar histórico de compras existente
      const comprasJson = await AsyncStorage.getItem('@compras');
      let compras = comprasJson ? JSON.parse(comprasJson) : [];

      // Adicionar nova compra ao histórico
      compras.push(compra);
      await AsyncStorage.setItem('@compras', JSON.stringify(compras));

      // Limpar o carrinho após salvar a compra
      setCartItems([]);
      await AsyncStorage.removeItem('@cartItems');

      Alert.alert('Compra Finalizada', 'Obrigado por comprar conosco!');
      navigation.navigate('Inicio', { isAdmin: route.params.isAdmin }); // Navegar para a TelaDashboard após finalizar a compra
    } catch (error) {
      console.error('Erro ao finalizar compra:', error);
    }
  };

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>R$ {item.price}</Text>
      <Button title="Remover" onPress={() => removeItem(item.cartId)} />
    </View>
  );

  const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0);

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>Seu carrinho está vazio.</Text>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.cartId}
            renderItem={renderCartItem}
            contentContainerStyle={styles.list}
          />
          <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
          <View style={styles.buttonsContainer}>
            <Button title="Finalizar Compra" onPress={removeAllItems} />
            <Button
              title="Calcular Frete"
              onPress={() => navigation.navigate('CalculoFrete')}
            />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyCartText: {
    fontSize: 18,
    textAlign: 'center',
  },
  list: {
    flexGrow: 1,
    justifyContent: 'flex-start',
  },
  cartItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  itemName: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    marginLeft: 10,
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
});

export default TelaCarrinho;
