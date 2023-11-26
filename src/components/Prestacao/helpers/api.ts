import axios from "axios";

type ListPrestacao = {
  userToken: any;
  itemsPerPage: number;
  currentPage: number;
};

export const fetchPrestacaoData = async ({ userToken }: ListPrestacao) => {
  const url = `/prestacao/?page=&limit=`;
  try {
    const response = await axios.get(url, {
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

type CreatePrestacao = {
  data: any;
  userToken: any;
};

export const createPrestacao = async ({ data, userToken }: CreatePrestacao) => {
  const url = `/prestacao/`;
  try {
    const response = await axios.post(url, data, {
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

type UpdatePrestacao = {
  prestacaoId: number | null;
  data: any;
  userToken: any;
};

export const editPrestacao = async ({
  prestacaoId,
  data,
  userToken,
}: UpdatePrestacao) => {
  const url = `/prestacao/${prestacaoId}`;
  try {
    const response = await axios.put(url, data, {
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

export type DeletePrestacao = {
  prestacaoId: number | null;
  userToken: any;
};

export const deletePrestacao = async ({
  prestacaoId,
  userToken,
}: DeletePrestacao) => {
  const url = `/prestacao/${prestacaoId}`;
  try {
    const response = await axios.delete(url, {
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

type ListColaborador = {
  userToken: any;
};

export const fetchColaboradorData = async ({ userToken }: ListColaborador) => {
  const url = `/colaborador/?usuario=&limit=&page=`;
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data.result;
  } catch (error) {
    console.error("Erro ao buscar dados:", error);
    throw error;
  }
};
