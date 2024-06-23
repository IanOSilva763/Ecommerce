import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import Graph from '../graph';

const TelaDashboard = () => {
  const [compras, setCompras] = useState([]);

  useEffect(() => {
    const loadCompras = async () => {
      try {
        const comprasJson = await AsyncStorage.getItem('@compras');
        if (comprasJson !== null) {
          setCompras(JSON.parse(comprasJson));
        }
      } catch (error) {
        console.error('Erro ao carregar histórico de compras:', error);
      }
    };

    loadCompras();
  }, []);

  const getGraficoData = () => {
    const productCount = {};

    compras.forEach(compra => {
      compra.itens.forEach(item => {
        if (productCount[item.nome]) {
          productCount[item.nome] += 1;
        } else {
          productCount[item.nome] = 1;
        }
      });
    });

    const labels = Object.keys(productCount);
    const data = Object.values(productCount);

    return {
      labels,
      datasets: [
        {
          data,
        },
      ],
    };
  };

  const graficoData = getGraficoData();

  const renderCompra = ({ item }) => (
    <View style={styles.compraContainer}>
      <Text style={styles.textoCompra}>Data: {item.data}</Text>
      <Text style={styles.textoCompra}>Horário: {item.horario}</Text>
      <Text style={styles.textoCompra}>Valor Total: R$ {item.valorTotal.toFixed(2)}</Text>
      <Text style={styles.textoCompra}>Itens:</Text>
      <FlatList
        data={item.itens}
        keyExtractor={(produto) => produto.id}
        renderItem={({ item }) => (
          <View>
            <Text>{item.nome} - R$ {item.preco.toFixed(2)}</Text>
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={compras}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderCompra}
        contentContainerStyle={styles.listaCompras}
      />
      <View>
        <Text style={styles.graphTitle}>Quantidade de Produtos Vendidos</Text>
        <Graph data={graficoData} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  listaCompras: {
    paddingBottom: 10,
  },
  compraContainer: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
  },
  textoCompra: {
    fontSize: 16,
    marginBottom: 5,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  graphStyle: {
    marginVertical: 8,
    borderRadius: 16,
  },
});

export default TelaDashboard;
