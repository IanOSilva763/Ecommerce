import React from 'react';
import { View, Text, Button } from 'react-native';

const TelaInicial = ({ navigation }) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Bem-vindo à Tela Inicial!</Text>
      <Button
        title="Ir para Produtos"
        onPress={() => navigation.navigate('Produto')}
      />
    </View>
  );
};

export default TelaInicial;