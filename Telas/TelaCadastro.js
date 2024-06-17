import React, { useState } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { registerUser } from '../api';

const TelaCadastro = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signUpUser = async () => {
    const user = { email, password };
    try {
      await registerUser(user);
      Alert.alert('Success', 'User registered successfully');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Sign Up Error', error.message);
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <Button title="Sign Up" onPress={signUpUser} />
    </View>
  );
};

export default TelaCadastro;
