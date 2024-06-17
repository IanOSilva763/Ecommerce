import axios from 'axios';
import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';

const API_URL = 'http://localhost:3000'; // ajuste conforme necessário

const TelaProduto = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');

  const addProduct = async () => {
    try {
      await axios.post(`${API_URL}/products`, {
        name,
        description,
        price,
        category
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" onChangeText={setName} />
      <TextInput placeholder="Description" onChangeText={setDescription} />
      <TextInput placeholder="Price" onChangeText={setPrice} />
      <TextInput placeholder="Category" onChangeText={setCategory} />
      <Button title="Add Product" onPress={addProduct} />
    </View>
  );
};

export default TelaProduto;
