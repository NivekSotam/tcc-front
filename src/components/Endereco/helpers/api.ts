import axios from "axios";

type GetPessoaById = {
  pessoaId: number;
  userToken: any;
};

export const fetchPessoaData = async ({
  pessoaId,
  userToken,
}: GetPessoaById) => {
  const url = `/pessoa/${pessoaId}`;
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

type GetEndereco = {
  pessoaId: number;
  userToken: any;
};

export const fetchEnderecoData = async ({
  pessoaId,
  userToken,
}: GetEndereco) => {
  const url = `/endereco/pessoa/${pessoaId}`;
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

type CreateEndereco = {
  data: any;
  pessoaId: number;
  userToken: any;
};

export const createEndereco = async ({
  data,
  pessoaId,
  userToken,
}: CreateEndereco) => {
  const url = `/endereco/${pessoaId}`;
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

type UpdateEndereco = {
  data: any;
  enderecoId: number | null;
  userToken: any;
};

export const editEndereco = async ({
  data,
  enderecoId,
  userToken,
}: UpdateEndereco) => {
  const url = `/endereco/${enderecoId}`;
  try {
    const response = await axios.put(url, data, {
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao editar endereco:", error);
    throw error;
  }
};

type DeleteEndereco = {
  enderecoId: number;
  userToken: any;
};

export const deleteEndereco = async ({
  enderecoId,
  userToken,
}: DeleteEndereco) => {
  const url = `/endereco/${enderecoId}`;
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
