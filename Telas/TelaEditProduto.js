import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import { getProductById, updateProduct } from '../api';

const TelaEditProduto = ({ route, navigation }) => {
  const { productId } = route.params;
  const isFocused = useIsFocused();
  const [product, setProduct] = useState({ name: '', description: '', price: '', imageUrl: '' });

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const fetchedProduct = await getProductById(productId);
        setProduct(fetchedProduct);
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
      }
    };

    if (isFocused) {
      loadProduct();
    }
  }, [isFocused, productId]);

  const handleUpdate = async () => {
    try {
      await updateProduct(productId, product);
      Alert.alert('Sucesso', 'Produto atualizado com sucesso');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o produto');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={product.name}
        onChangeText={(text) => setProduct({ ...product, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Descrição"
        value={product.description}
        onChangeText={(text) => setProduct({ ...product, description: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço"
        value={product.price}
        onChangeText={(text) => setProduct({ ...product, price: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem"
        value={product.imageUrl}
        onChangeText={(text) => setProduct({ ...product, imageUrl: text })}
      />
      <Button title="Salvar" onPress={handleUpdate} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});

export default TelaEditProduto;
