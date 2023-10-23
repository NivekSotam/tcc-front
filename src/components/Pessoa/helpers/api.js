import axios from "axios";

export const fetchData = async (searchType, searchTerm, userToken, sortOrder) => {
  try {
    const response = await axios.get(`/pessoa/list?${searchType}=${searchTerm}&order=${sortOrder}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data.pessoas;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};

