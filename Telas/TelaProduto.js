import axios from 'axios';
import React, { useState } from 'react';
import { TouchableOpacity, TextInput, View, Text, StyleSheet } from 'react-native';

const API_URL = 'http://192.168.2.187:3000/products'; // ajuste conforme necessário

const TelaProduto = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageURL, setImageURL] = useState('');

  const addProduct = async () => {
    try {
      const productData = {
        name,
        description,
        price,
        imageURL,
      };

      await axios.post(API_URL, productData);

      setName('');
      setDescription('');
      setPrice('');
      setImageURL('');

      // Mostrar algum feedback ao usuário (opcional)
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product. Please try again.');
    }
  };

  return (
    <View style={styles.principal}>
      <TextInput
        style={styles.textInput}
        placeholder="Produto"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={[styles.textInput, styles.textArea]}
        placeholder="Descricao"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Preco"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Image URL"
        value={imageURL}
        onChangeText={setImageURL}
      />
      <TouchableOpacity onPress={addProduct} style={styles.button}>
        <Text style={styles.buttonText}>Cadastrar Produto</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  principal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#425dbd',
    padding: 20,
  },
  textInput: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  textArea: {
    height: 100,
  },
  button: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: '#425dbd',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TelaProduto;
