import axios from 'axios';

const FRETE_API_URL = 'https://www.cepcerto.com/api-calculo-frete';

export const calculoFrete = async (cepDestino) => {
  try {
    const response = await axios.post(FRETE_API_URL, {
      cepOrigem: '01001-000', // CEP de origem fictício
      cepDestino: cepDestino,
      peso: 1, // Peso fictício em kg
      comprimento: 20, // Comprimento fictício em cm
      altura: 10, // Altura fictícia em cm
      largura: 15, // Largura fictícia em cm
    });

    const { custoFrete, tempoEntrega } = response.data;

    return {
      custoFrete,
      tempoEntrega,
    };
  } catch (error) {
    console.error('Erro ao calcular frete:', error);
    throw new Error('Não foi possível calcular o frete');
  }
};
