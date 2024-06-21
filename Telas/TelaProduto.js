import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { addProduct } from '../api';

const TelaProduto = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddProduct = async () => {
    const product = { name, description, price, category, imageUrl };
    try {
      await addProduct(product);
      Alert.alert('Success', 'Product added successfully');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Name" onChangeText={setName} value={name} />
      <TextInput placeholder="Description" onChangeText={setDescription} value={description} />
      <TextInput placeholder="Price" onChangeText={setPrice} value={price} keyboardType="numeric" />
      <TextInput placeholder="Category" onChangeText={setCategory} value={category} />
      <TextInput placeholder="Image URL" onChangeText={setImageUrl} value={imageUrl} />
      <Button title="Add Product" onPress={handleAddProduct} />
    </View>
  );
};

export default TelaProduto;