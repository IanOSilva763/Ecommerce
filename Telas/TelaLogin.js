import * as LocalAuthentication from 'expo-local-authentication';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { getUserByEmail } from '../api';

const TelaLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async () => {
    try {
      const user = await getUserByEmail(email);
      if (user && user.password === password) {
        const isAdmin = (email === 'Adm' && password === 'Adm');
        navigation.navigate('Inicio', { isAdmin });
      } else {
        Alert.alert('Login Error', 'Invalid email or password');
      }
    } catch (error) {
      Alert.alert('Login Error', error.message);
    }
  };
  const authenticate = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      if (hasHardware && isEnrolled) {
        const result = await LocalAuthentication.authenticateAsync({
          promptMessage: 'Authenticate',
          fallbackLabel: 'Use Passcode',
        });
        if (result.success) {
          const user = await getUserByEmail(email);  // Verify user credentials
          if (user && user.password === password) {
            navigation.navigate('Inicio', { isAdmin: user.email === 'adm' && user.password === 'adm' });
          } else {
            Alert.alert('Login Error', 'Invalid email or password');
          }
        } else {
          Alert.alert('Authentication Error', 'Failed to authenticate');
        }
      } else {
        Alert.alert('Authentication Error', 'Device authentication not available');
      }
    } catch (error) {
      Alert.alert('Authentication Error', error.message);
    }
  };

  return (
    <View style={style.container} >
      <TextInput style={style.textInput} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput style={style.textInput} placeholder="Password" value={password} secureTextEntry onChangeText={setPassword} />
      <TouchableOpacity onPress={loginUser} style={style.button}>
        <Text style={style.textbtn}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Cadastro')} style={[style.button, style.signupButton]}>
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
    marginTop: 10,
    elevation: 3,
    backgroundColor: '#FFFFFF',
  },
  signupButton: {
    marginTop: 20, 
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

export default TelaLogin;
