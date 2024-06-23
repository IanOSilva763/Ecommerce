import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { addProduct } from '../api';

const TelaProduto = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleAddProduct = async () => {
    const product = { name, description, price, imageUrl };
    try {
      await addProduct(product);
      Alert.alert('Sucesso', 'Produto adicionado com sucesso');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Erro', error.message);
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
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={3}
      />
      <TextInput
        style={styles.textInput}
        placeholder="Preço"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.textInput}
        placeholder="URL da Imagem"
        value={imageUrl}
        onChangeText={setImageUrl}
      />
      <TouchableOpacity onPress={handleAddProduct} style={styles.button}>
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
