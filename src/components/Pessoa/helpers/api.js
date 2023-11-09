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

export const deletePerson = async (personId, userToken) => {
  try {
    const response = await axios.delete(`/pessoa/${personId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao excluir pessoa:", error);
    throw error;
  }
};

export const editPerson = async ({ personId, updatedPersonData, userToken }) => {
  try {
    const response = await axios.put(`/pessoa/${personId}`, updatedPersonData, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar pessoa:", error);
    throw error;
  }
};


export const getPersonById = async (personId, userToken) => {
  try {
    const response = await axios.get(`/pessoa/${personId}`, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar pessoa por ID:", error);
    throw error;
  }
};

