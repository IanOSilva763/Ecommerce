import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { getUserByEmail } from '../api'; // Ajuste o caminho conforme necessário

const TelaLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const user = await getUserByEmail(email);
      if (user && user.password === password) {
        navigation.navigate('Inicio');
      } else {
        Alert.alert('Login Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Login" onPress={loginUser} />
      <Button title="Sign Up" onPress={() => navigation.navigate('Cadastro')} />
    </View>
  );
};

export default TelaLogin;
