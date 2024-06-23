import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchOrders, getProducts, deleteProductById } from '../api'; // Corrigido, removendo duplicação
import { useIsFocused } from '@react-navigation/native';

const TelaAdm = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Erro ao carregar produtos:', error);
      }
    };

    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Erro ao carregar pedidos:', error);
      }
    };

    if (isFocused) {
      loadProducts();
      loadOrders();
    }
  }, [isFocused]);

  const handleDeleteProduct = async (productId) => {
    try {
      await deleteProductById(productId);
      Alert.alert('Produto deletado com sucesso');
      setProducts(products.filter(product => product.id !== productId));
    } catch (error) {
      Alert.alert('Erro ao deletar produto:', error.message);
    }
  };

  const renderProductItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <Text style={styles.itemName}>{item.name}</Text>
      <Text style={styles.itemPrice}>R$ {item.price}</Text>
      <Button title="Deletar" onPress={() => handleDeleteProduct(item.id)} />
    </View>
  );

  const renderOrderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemName}>Pedido #{item.id}</Text>
      <Text style={styles.itemPrice}>Total: R$ {item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Administração</Text>
      <Text style={styles.sectionHeader}>Produtos</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProductItem}
        contentContainerStyle={styles.list}
      />
      <Text style={styles.sectionHeader}>Pedidos</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  list: {
    paddingBottom: 10,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
  },
  itemImage: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
  },
  itemName: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: '#28a745',
  },
});

export default TelaAdm;
