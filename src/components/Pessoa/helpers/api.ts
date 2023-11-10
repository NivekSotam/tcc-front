import axios from "axios";

export const fetchData = async ({searchType, searchTerm, userToken,}: any) => {
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

export const createPerson = async (newPersonData: any, userToken: any) => {
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

export const deletePerson = async ({personId, userToken}: any) => {
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

export type UpdatePerson = {
  nome: string | null,
  email: string | null,
  telefone: string | null,
  cadastro: string | null,
  registro: string | null
}

type UpdatePersonData = {
  personId: any,
  userToken: any,
  updatedPersonData: UpdatePerson
}


export const editPerson = async ({ personId, userToken, updatedPersonData }: UpdatePersonData) => {
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


export const getPersonById = async ({personId, userToken}: any) => {
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

