import axios from "axios";

type ListCliente = {
  nome?: string;
  userToken: any;
  itemsPerPage: number;
  currentPage: number;
};

export const fetchCliforData = async ({
  nome,
  userToken,
  itemsPerPage,
  currentPage,
}: ListCliente) => {
  const url = `/clientefornecedor/?nome=${nome}&isCliente=0&limit=&page=`;
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

type CreateFornecedor = {
  data: any;
  userToken: any;
};

export const createFornecedor = async ({
  data,
  userToken,
}: CreateFornecedor) => {
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

type UpdateFornecedor = {
  data: any;
  fornecedorId: number | null;
  userToken: any;
};

export const editFornecedor = async ({
  data,
  fornecedorId,
  userToken,
}: UpdateFornecedor) => {
  const url = `/clientefornecedor/${fornecedorId}`;
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar cliente:", error);
    throw error;
  }
};

type DeleteFornecedor = {
  fornecedorId: number;
  userToken: any;
};

export const deleteFornecedor = async ({
  fornecedorId,
  userToken,
}: DeleteFornecedor) => {
  const url = `/clientefornecedor/${fornecedorId}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    throw error;
  }
};
