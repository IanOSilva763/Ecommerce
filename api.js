import axios from 'axios';

const API_URL = 'http://192.168.2.187:3000';

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
    return response.data[0];
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    throw new Error('Erro ao buscar usuário');
  }
};

export const addProduct = async (product) => {
  try {
    const response = await axios.post(`${API_URL}/products`, product);
    return response.data;
  } catch (error) {
    console.error('Erro ao adicionar produto:', error);
    throw new Error('Erro ao adicionar produto');
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    throw new Error('Erro ao buscar produtos');
  }
};

export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/products/${productId}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    throw error;
  }
};

// Update a product
export const updateProduct = async (productId, productData) => {
  try {
    const response = await axios.put(`${API_URL}/products/${productId}`, productData);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    throw error;
  }
};

// Delete a product by ID
export const deleteProductById = async (productId) => {
  try {
    await axios.delete(`${API_URL}/products/${productId}`);
  } catch (error) {
    console.error('Erro ao apagar produto:', error);
    throw error;
  }
};

export const fetchOrders = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    throw new Error('Erro ao buscar pedidos');
  }
};