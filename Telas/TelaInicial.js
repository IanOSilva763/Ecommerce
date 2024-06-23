import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getProducts } from '../api';
import geolib from 'geolib';

const TelaInicial = ({ route, navigation }) => {
  const { isAdmin } = route.params;
  const isFocused = useIsFocused();
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    if (isFocused) {
      fetchProducts();
    }
  }, [isFocused]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const cartItemsJson = await AsyncStorage.getItem('@cartItems');
        if (cartItemsJson !== null) {
          const parsedCartItems = JSON.parse(cartItemsJson).filter(item => !item.removed);
          setCartItems(parsedCartItems);
        }
      } catch (error) {
        console.error('Erro ao carregar carrinho:', error);
      }
    };

    loadCartItems();
  }, []);

  const addToCart = async (product) => {
    const uniqueCartId = `${product.id}-${new Date().getTime()}`;
    const updatedCartItems = [
      ...cartItems.filter(item => !item.removed),
      { ...product, cartId: uniqueCartId }
    ];
    setCartItems(updatedCartItems);
    try {
      await AsyncStorage.setItem('@cartItems', JSON.stringify(updatedCartItems.filter(item => !item.removed)));
    } catch (error) {
      console.error('Erro ao salvar carrinho:', error);
    }
    navigation.navigate('Carrinho', { cartItems: updatedCartItems });
  };

  // Função para obter coordenadas geográficas a partir do CEP usando a API do ViaCEP
  const fetchCoordinatesFromCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const { data } = response;
      if (data && !data.erro) {
        return { latitude: parseFloat(data.lat), longitude: parseFloat(data.lng) };
      } else {
        console.error('CEP não encontrado');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar coordenadas pelo CEP:', error);
      return null;
    }
  };

  // Função para calcular a distância entre duas coordenadas geográficas usando Haversine formula
  const calcularDistancia = async (product, cep) => {
    try {
      const coordinatesProduct = { latitude: product.latitude, longitude: product.longitude };
      const coordinatesUser = await fetchCoordinatesFromCEP(cep);
      if (coordinatesUser) {
        const distancia = geolib.getPreciseDistance(coordinatesUser, coordinatesProduct) / 1000; // em quilômetros
        return distancia.toFixed(2); // arredonda para duas casas decimais
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao calcular distância:', error);
      return null;
    }
  };

  const renderProduct = ({ item }) => (
    <View style={styles.containerProduto}>
      <Image source={{ uri: item.imageUrl }} style={styles.imagemProduto} />
      <Text style={styles.nomeProduto}>{item.name}</Text>
      <Text style={styles.descricaoProduto}>{item.description}</Text>
      <Text style={styles.precoProduto}>R$ {item.price}</Text>
      <Button title="Adicionar ao Carrinho" onPress={() => addToCart(item)} />
      <Text style={styles.freteInfo}>Distância: {item.cep ? `${calcularDistancia(item, item.cep)} km` : 'Informe o CEP para calcular'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <Text style={styles.tituloTopo}>Bem-vindo à Tela Inicial!</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Carrinho', { cartItems })}>
          <Icon name="shopping-cart" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      {isAdmin && (
        <Button
          title="Tela Adm"
          onPress={() => navigation.navigate('Admin')}
        />
      )}
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderProduct}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tituloTopo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    padding: 10,
  },
  containerProduto: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  imagemProduto: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  nomeProduto: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 10,
  },
  descricaoProduto: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  precoProduto: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 10,
    color: '#28a745',
  },
  freteInfo: {
    fontSize: 14,
    marginHorizontal: 10,
    color: '#888',
  },
});

export default TelaInicial;
