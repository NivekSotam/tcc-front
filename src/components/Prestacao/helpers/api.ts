import axios from "axios";

type ListPrestacao = {
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
  }: ListPrestacao) => {
    try {
      const response = await axios.get(`/prestacao/?nome=${nome}&page=${currentPage}&limit=${itemsPerPage}`, {
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