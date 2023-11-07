import axios from "axios";

export const fetchData = async (searchType, searchTerm, userToken,) => {
  try {
    const response = await axios.get(`/pessoa/?${searchType}=${searchTerm}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};


export const createPerson = async (newPersonData, userToken) => {
  try {
    const response = await axios.post("/pessoa", newPersonData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao criar pessoa:", error);
    throw error;
  }
};
