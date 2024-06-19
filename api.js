import axios from 'axios';

const API_URL = 'http://192.168.1.10:3000';

export const registerUser = async (user) => {
  try {
    const response = await axios.post(`${API_URL}/users`, user);
    return response.data;
  } catch (error) {
    if (error.response) {
      // O servidor retornou um status de erro
      if (error.response.status === 400) {
        // Exemplo: servidor retorna status 400 e mensagem de erro específica
        throw new Error(`Erro ao registrar usuário: ${error.response.data.message}`);
      } else {
        // Outros status de erro
        throw new Error(`Erro de servidor: ${error.response.status}`);
      }
    } else if (error.request) {
      // A requisição foi feita, mas não recebeu resposta
      throw new Error('Sem resposta do servidor');
    } else {
      // Erro durante a configuração da requisição
      throw new Error('Erro ao enviar requisição');
    }
  }
};
export const getUserByEmail = async (email) => {
  try {
    const response = await axios.get(`${API_URL}/users?email=${email}`);
    return response.data[0]; // Como a busca retorna um array, pegue o primeiro item
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw new Error('Erro ao buscar usuário');
  }
};