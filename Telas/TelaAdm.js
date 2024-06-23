import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { deleteProductById, fetchOrders, getProducts } from '../api';
import { fetchOrders, getProducts, deleteProductById } from '../api'; 

const TelaAdm = ({ navigation }) => {
  const isFocused = useIsFocused();
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  const loadProducts = async () => {
    try {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    }
  };

  const loadOrders = async () => {
    try {
      const fetchedOrders = await fetchOrders();
      setOrders(fetchedOrders);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      loadProducts();
      loadOrders();
    }
  }, [isFocused]);

  const editProduct = (productId) => {
    navigation.navigate('EditProduto', { productId });
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteProductById(productId);
      setProducts(products.filter((product) => product.id !== productId));
      Alert.alert('Sucesso', 'Produto apagado com sucesso');
    } catch (error) {
      console.error('Erro ao apagar produto:', error);
      Alert.alert('Erro', 'Não foi possível apagar o produto');
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} onError={() => console.error('Erro ao carregar imagem')} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>R$ {item.price}</Text>
      <TouchableOpacity onPress={() => editProduct(item.id)} style={styles.button}>
        <Text style={styles.textbtn}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteProduct(item.id)} style={styles.button}>
        <Text style={styles.textbtn}>Apagar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrder = ({ item, index }) => (
    <View key={index} style={styles.orderContainer}>
      <Text>Order #{index + 1}</Text>
      {item.products.map((product, idx) => (
        <Text key={idx}>{product.name} - R$ {product.price}</Text>
      ))}
      <Text>Shipping: R$ {item.shippingCost}</Text>
      <Text>Total: R$ {item.total}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin</Text>
      <Button
        title="Controle vendas"
        onPress={() => navigation.navigate('Dashboard')}
      />
      <Button
        title="Adicionar Produto"
        onPress={() => navigation.navigate('Produto')}
      />
      <FlatList
        data={orders}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderOrder}
        contentContainerStyle={styles.list}
      />
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  list: {
    paddingBottom: 22,
  },
  productContainer: {
    marginBottom: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  productDescription: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    color: '#28a745',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 1,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 4,
    marginTop: 10,
    elevation: 3,
    backgroundColor: '#FFFFFF',
  },
  textbtn: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  orderContainer: {
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
  },
});

export default TelaAdm;
