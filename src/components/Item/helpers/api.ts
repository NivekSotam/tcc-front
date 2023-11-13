import axios from "axios";

type ListItem = {
    nome?: string;
    userToken: any,
    itemsPerPage: number,
    currentPage: number
}

export const fetchItemData = async ({
    nome,
    userToken,
    itemsPerPage,
    currentPage}: ListItem) => {
    const url = `/item/?nome=${nome}&limit=${itemsPerPage}&page=${currentPage}`;
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