import axios from "axios";

type ListServico = {
  nome?: string;
  userToken: any;
  itemsPerPage: number;
  currentPage: number;
};

export const fetchServicoData = async ({
  nome,
  userToken,
  itemsPerPage,
  currentPage,
}: ListServico) => {
  try {
    const response = await axios.get(`/servico/?nome=${nome}&page=&limit=`, {
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
};

export const createServico = async ({ data, userToken }: CreateServico) => {
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

type UpdateServico = {
  data: any;
  servicoId: number | null;
  userToken: any;
};

export const editServico = async ({
  data,
  servicoId,
  userToken,
}: UpdateServico) => {
  const url = `/servico/${servicoId}`;
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

type DeleteServico = {
  servicoId: number | null;
  userToken: any;
};

export const deleteServico = async ({
  servicoId,
  userToken,
}: DeleteServico) => {
  const url = `/servico/${servicoId}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
