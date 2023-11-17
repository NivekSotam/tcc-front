import axios from "axios";

type ListServico = {
  nome?: string;
  userToken: any;
  itemsPerPage: number;
  currentPage: number;
}

export const fetchServicoData = async ({
  nome,
  userToken,
  itemsPerPage,
  currentPage
}: ListServico) => {
  try {
    const response = await axios.get(`/servico/?nome=${nome}&page=${currentPage}&limit=${itemsPerPage}`, {
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

type CreateServico = {
  data: any;
  userToken: any;
}

export const createServico = async ({
  data,
  userToken
}: CreateServico) => {
  try {
    const response = await axios.post("/servico", data, {
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