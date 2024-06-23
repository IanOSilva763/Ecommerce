const calcularDistanciaEntreCeps = (cepOrigem, cepDestino) => {
const origemEstado = cepOrigem.slice(0, 2);
const destinoEstado = cepDestino.slice(0, 2);

  if (origemEstado === destinoEstado) {
    return 'mesmoEstado';
  }
  return 'diferenteRegiao';
};

const CalculoFrete = async (cepDestino) => {
  const cepOrigem = '36015-260'; 
  let custoFrete = 10.0; 

  const distancia = calcularDistanciaEntreCeps(cepOrigem, cepDestino);

  let tempoEntrega;
  switch (distancia) {
    case 'mesmoEstado':
      custoFrete += 5.0;
      tempoEntrega = '2-3 dias úteis';
      break;
    case 'diferenteRegiao':
      custoFrete += 20.0;
      tempoEntrega = '7-10 dias úteis';
      break;
    default:
      throw new Error('Erro ao determinar a distância entre os CEPs');
  }

  return {
    custoFrete,
    tempoEntrega,
  };
};

export default CalculoFrete;