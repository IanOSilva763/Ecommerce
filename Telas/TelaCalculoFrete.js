import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import axios from 'axios';
import geolib from 'geolib';

const TelaCalculoFrete = () => {
  const [cep, setCep] = useState('');
  const [frete, setFrete] = useState(null);

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

  const calcularDistancia = async (coordinatesUser, coordinatesProduct) => {
    try {
      if (!coordinatesUser) {
        return null;
      }
      const distancia = geolib.getPreciseDistance(coordinatesUser, coordinatesProduct) / 1000; // em quilômetros
      return distancia.toFixed(2); 
    } catch (error) {
      console.error('Erro ao calcular distância:', error);
      return null;
    }
  };

  const handleCalcularFrete = async () => {
    if (!cep.trim()) {
      Alert.alert('Informe o CEP', 'Por favor, informe um CEP válido.');
      return;
    }

    const coordinatesProduct = { latitude: -23.5505, longitude: -46.6333 };

    const coordinatesUser = await fetchCoordinatesFromCEP(cep);

    if (coordinatesUser) {
      const distancia = await calcularDistancia(coordinatesUser, coordinatesProduct);
      if (distancia !== null) {
        setFrete(`Frete calculado para CEP ${cep}: Distância ${distancia} km`);
      } else {
        setFrete('Não foi possível calcular a distância.');
      }
    } else {
      Alert.alert('CEP não encontrado', 'Por favor, verifique o CEP informado.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cálculo de Frete</Text>
      <TextInput
        style={styles.inputCEP}
        placeholder="Informe o CEP"
        keyboardType="numeric"
        value={cep}
        onChangeText={setCep}
      />
      <TouchableOpacity style={styles.buttonCalcular} onPress={handleCalcularFrete}>
        <Text style={styles.textCalcular}>Calcular Frete</Text>
      </TouchableOpacity>
      {frete && <Text style={styles.freteResultado}>{frete}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputCEP: {
    width: '100%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonCalcular: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  textCalcular: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  freteResultado: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default TelaCalculoFrete;
