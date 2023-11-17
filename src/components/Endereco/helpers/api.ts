import axios from "axios";

type GetPessoaById = {
  pessoaId: number;
  userToken: any;
}

export const fetchPessoaData = async ({
  pessoaId,
  userToken
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
}

export const fetchEnderecoData = async({
  pessoaId,
  userToken
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
}

type CreateEndereco = {
  data: any;
  pessoaId: number;
  userToken: any;
}

export const createEndereco = async ({
  data,
  pessoaId,
  userToken
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
}