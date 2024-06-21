import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { getProducts } from '../api';

const TelaInicial = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

  const renderProduct = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>R$ {item.price}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bem-vindo à Tela Inicial!</Text>
      <Button
        title="Ir para Produtos"
        onPress={() => navigation.navigate('Produto')}
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
});

export default TelaInicial;