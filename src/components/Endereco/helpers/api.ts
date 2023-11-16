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
      console.log(response)
      return response.data;
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
      throw error;
    }
};