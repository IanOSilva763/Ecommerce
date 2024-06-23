import React, { useContext, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { CalculoFrete } from '../CalculoFrete';
import { CarrinhoContexto } from '../CarrinhoContexto';

const TelaPedido = () => {
  const { carrinho } = useContext(CarrinhoContexto);
  const [frete, setFrete] = useState(null);

  const handleCheckout = async () => {
    const freteInfo = await CalculoFrete('12345678'); // Exemplo de CEP
    setFrete(freteInfo);
  };

  const total = carrinho.reduce((sum, produto) => sum + produto.preco, 0) + (frete ? frete.custoFrete : 0);

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Resumo da compra</Text>
      {carrinho.map(produto => (
        <Text key={produto.id} style={styles.itemText}>{produto.nome} - R$ {produto.preco}</Text>
      ))}
      {frete && (
        <>
          <Text style={styles.freteText}>Valor do frete: R$ {frete.custoFrete}</Text>
          <Text style={styles.freteText}>Tempo de Delivery: {frete.tempoEntrega}</Text>
        </>
      )}
      <Text style={styles.totalText}>Total: R$ {total.toFixed(2)}</Text>
      <Button title="Checkout" onPress={handleCheckout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 10,
  },
  freteText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#28a745',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
});

export default TelaPedido;