import axios from "axios";

type ListPrestacao = {
    userToken: any;
    itemsPerPage: number;
    currentPage: number;
  }
  
  export const fetchPrestacaoData = async ({
    userToken,
    itemsPerPage,
    currentPage
  }: ListPrestacao) => {
    try {
      const response = await axios.get(`/prestacao/?page=${currentPage}&limit=${itemsPerPage}`, {
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