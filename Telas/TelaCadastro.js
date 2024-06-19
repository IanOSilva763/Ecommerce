import React, { useState } from 'react';
import { Alert, TouchableOpacity, StyleSheet, TextInput, View, Text } from 'react-native';
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
    <View style={style.container}>
      <TextInput style={style.textInput} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={style.textInput} placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity onPress={signUpUser} style={style.button}>
        <Text style={style.textbtn}>Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#425dbd',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
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
  textInput: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
  },
});

export default TelaCadastro;
