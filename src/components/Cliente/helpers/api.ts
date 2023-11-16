import axios from "axios";

type ListCliente = {
    nome?: string;
    userToken: any;
    itemsPerPage: number;
    currentPage: number;
}

export const fetchCliforData = async ({
    nome,
    userToken,
    itemsPerPage,
    currentPage,
}: ListCliente) => {
    const url = `/clientefornecedor/?nome=${nome}&isCliente=1&limit=${itemsPerPage}&page=${currentPage}`
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

type createCliente = {
    data: any,
    userToken: any
}

export const createCliente = async ({
    data,
    userToken
}: createCliente) => {
    try {
      const response = await axios.post("/clientefornecedor", data, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Erro ao criar cliente:", error);
      throw error;
    }
  };