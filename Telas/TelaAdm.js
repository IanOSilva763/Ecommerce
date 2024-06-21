import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchOrders, getProducts } from '../api'; // Certifique-se de que o caminho está correto

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
    // Navegar para a tela de edição com o ID do produto
    navigation.navigate('EditProduto', { productId });
  };

  const deleteProduct = async (productId) => {
    try {
      await deleteProductById(productId);
      // Atualizar a lista de produtos após a exclusão
      setProducts(products.filter((product) => product.id !== productId));
      Alert.alert('Sucesso', 'Produto apagado com sucesso');
    } catch (error) {
      console.error('Erro ao apagar produto:', error);
      Alert.alert('Erro', 'Não foi possível apagar o produto');
    }
  };

  const renderProduct = ({ item }) => (
    <View styles={styles.productContainer}>
      <Image source={{ uri: item.imageUrl }} styles={styles.productImage} />
      <Text styles={styles.productName}>{item.name}</Text>
      <Text styles={styles.productDescription}>{item.description}</Text>
      <Text styles={styles.productPrice}>R$ {item.price}</Text>
      <TouchableOpacity onPress={() => editProduct(item.id)} styles={[styles.button]}>
        <Text styles={styles.textbtn}>Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => deleteProduct(item.id)} styles={[styles.button]}>
        <Text styles={styles.textbtn}>Apagar</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOrder = ({ item, index }) => (
    <View key={index} styles={styles.orderContainer}>
      <Text>Order #{index + 1}</Text>
      {item.products.map((product, idx) => (
        <Text key={idx}>{product.name} - R$ {product.price}</Text>
      ))}
      <Text>Shipping: R$ {item.shippingCost}</Text>
      <Text>Total: R$ {item.total}</Text>
    </View>
  );

  return (
    <View styles={styles.container}>
      <Text styles={styles.header}>Admin Dashboard</Text>
      <Button
        title="Ir para Produtos"
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
    padding: 10,
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
