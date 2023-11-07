import axios from "axios";

export const fetchServicoData = async (searchType, searchTerm, userToken) => {
  try {
    const response = await axios.get(`/servico?${searchType}=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    console.log(response)
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

export const createServico = async (newServicoData, userToken) => {
  try {
    const response = await axios.post("/servico", newServicoData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar servico:", error);
    throw error;
  }
};