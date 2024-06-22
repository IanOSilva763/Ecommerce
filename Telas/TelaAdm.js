import React, { useEffect, useState } from 'react';
import { Alert, Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchOrders, getProducts, deleteProductById } from '../api'; // Certifique-se de que deleteProductById esteja importada corretamente

const TelaAdm = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    loadOrders();
  }, []);

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
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
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
      <Text style={styles.header}>Admin Dashboard</Text>
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
    paddingBottom: 10,
  },
  productContainer: {
    marginBottom: 20,
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
    marginBottom: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
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
